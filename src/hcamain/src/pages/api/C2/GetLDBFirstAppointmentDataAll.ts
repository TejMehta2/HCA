import type { NextApiRequest, NextApiResponse } from 'next';
import { getLDBFirstAppointmentDatas } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get First Appointment API - get all the data
// ability to call from the client side (internally without passing secrets)
const GetLDBFirstAppointmentDataAll = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  if (!req) {
    console.error('error - no request found for GetLDBFirstAppointmentDataAll');
  }
  const response = await getLDBFirstAppointmentDatas([], ''); // no params - get all
  res.appendHeader('Cache-Control', 'max-age=3600');
  res.appendHeader('CDN-Cache-Control', 'max-age=3600');
  res.appendHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  return res.status(200).json(response);
};

export default GetLDBFirstAppointmentDataAll;
