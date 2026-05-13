import type { NextApiRequest, NextApiResponse } from 'next';
import { getLDBFirstAppointmentDatas } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get First Appointment API ability to call from the client side (internally without passing secrets)
const GetLDBFirstAppointmentDatas = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { gmcNumber }, // pass as individual gmcNumber=xx&gmcNumber=yy
    query: { gmcNumbers }, // pass as comma separated gmcNumbers=xx,yy
  } = req;

  //console.log("gmcNumbers",gmcNumber as string[]);
  const response = await getLDBFirstAppointmentDatas(
    gmcNumber as string[],
    gmcNumbers as string
  ); // e.g. "4113571"
  res.setHeader('Cache-Control', 'max-age=60');
  res.setHeader('CDN-Cache-Control', 'max-age=180');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=360');
  return res.status(200).json(response);
};

export default GetLDBFirstAppointmentDatas;
