import { findAddress, IFindAddressFields } from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';

// wrapper for integration layer postcode lookup API
// call e.g. https://www.hcacloud.localhost/api/locationAPI/FindAddress?postCode=TN233DS
const FindAddress = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const fieldBody: IFindAddressFields = req.body as IFindAddressFields;
  const fieldParams: IFindAddressFields | unknown = req.query; // destruct if passed as query params
  const params: IFindAddressFields = fieldBody || fieldParams;
  console.log('FindAddressFields params...', params);
  const response = await findAddress(params);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=600');
  res.setHeader('CDN-Cache-Control', 'max-age=1800');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  return res.status(200).json(response);
};

export default FindAddress;
