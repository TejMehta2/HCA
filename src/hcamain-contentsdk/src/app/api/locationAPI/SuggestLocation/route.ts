import {
  ISuggestLocationFields,
  suggestLocation,
} from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';
//import { SuggestLocation } from 'lib/consultant-finder/HCA';

// wrapper for integration layer location API
const SuggestLocation = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const fieldBody: ISuggestLocationFields = req.body as ISuggestLocationFields;
  const fieldParams: ISuggestLocationFields | unknown = req.query; // destruct if passed as query params
  const params: ISuggestLocationFields = fieldBody || fieldParams;
  console.log('SuggestLocation params...', params);
  const response = await suggestLocation(params);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=600');
  res.setHeader('CDN-Cache-Control', 'max-age=1800');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  return res.status(200).json(response);
};

export default SuggestLocation;
