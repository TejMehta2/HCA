import type { NextApiRequest, NextApiResponse } from 'next';
import { getLDBFirstAppointmentData } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get Consultant Slots API ability to call from the client side (internally without passing secrets)
const GetLDBConsultantSlots = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { gmcNumber },
  } = req;

  const response = await getLDBFirstAppointmentData(gmcNumber as string); // e.g. "4113571"
  return res.status(200).json(response);
};

export default GetLDBConsultantSlots;
