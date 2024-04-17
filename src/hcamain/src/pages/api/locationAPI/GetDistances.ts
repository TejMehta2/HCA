import type { NextApiRequest, NextApiResponse } from 'next';
import {
  IGetDistancesFields,
  submitBookingEnquiry,
} from 'lib/consultant-finder/API_HCA';

// wrapper for integration layer location API
const GetDistances = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const fields: IGetDistancesFields = req.body as IGetDistancesFields;
  const response = await submitBookingEnquiry(fields);
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(response);

  /*
  const response = { res: true };
  const {
    query: {
      provider, //e.g.:Google
      method, // e.g. Default
      units, //e.g. Kilometers
      order, // e.g. Default
      origin, // e.g. TN23%201DR
      originType, // e.g. Postcode
      destinations, //e.g.WD6%203BS%2C%20TN23%203DS
      destinationType, // e.g.Postcode
    },
  } = req;
  await getDistances(
    provider as string, //e.g.:Google
    method as string, // e.g. Default
    units as string, //e.g. Kilometers
    order as string, // e.g. Default
    origin as string, // e.g. TN23%201DR
    originType as string, // e.g. Postcode
    destinations as string, //e.g.WD6%203BS%2C%20TN23%203DS
    destinationType as string // e.g.Postcode
  );
  return res.status(200).json(response);*/
};

export default GetDistances;
