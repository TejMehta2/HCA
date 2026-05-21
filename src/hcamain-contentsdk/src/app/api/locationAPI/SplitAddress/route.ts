import {
  splitAddress,
  ISplitAddressFields,
} from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';

// wrapper for integration layer postcode lookup API
// call e.g. https://www.hcacloud.localhost/api/locationAPI/SplitAddress?monikerField=7.730sOGBRDwPoBwAAAAABAwEAAAAAptP8UgAhEAIAAAAAAAAAAAD..2QAAAAA.....wAAAAAAAAAAAAAAAAAAAFROMjMgM0RTAAAAAAA-
const SplitAddress = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const fieldBody: ISplitAddressFields = req.body as ISplitAddressFields;
  const fieldParams: ISplitAddressFields | unknown = req.query; // destruct if passed as query params
  const params: ISplitAddressFields = fieldBody || fieldParams;
  console.log('SplitAddressFields params...', params);
  const response = await splitAddress(params);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=600');
  res.setHeader('CDN-Cache-Control', 'max-age=1800');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  return res.status(200).json(response);
};

export default SplitAddress;
