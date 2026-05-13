import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getDistances,
  IGetDistancesFields,
} from 'lib/consultant-finder/API_HCA';

// wrapper for integration layer location API
/* e.g.
      provider, //e.g.:Google
      method, // e.g. Default
      units, //e.g. Kilometers
      order, // e.g. Default
      origin, // e.g. TN23%201DR
      originType, // e.g. Postcode
      destinations, //e.g.WD6%203BS%2C%20TN23%203DS
      destinationType, // e.g.Postcode 
*/
const GetDistances = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const fieldBody: IGetDistancesFields = req.body as IGetDistancesFields;
  const fieldParams: IGetDistancesFields | unknown = req.query; // destruct if passed as query params
  const params: IGetDistancesFields = fieldBody || fieldParams;
  console.log('GetDistances params...', params);
  const response = await getDistances(params);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=600');
  res.setHeader('CDN-Cache-Control', 'max-age=1800');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  return res.status(200).json(response);
};

export default GetDistances;
