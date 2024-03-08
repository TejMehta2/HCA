import type { NextApiRequest, NextApiResponse } from 'next';
import { getLDBConsultantDetails } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get Consultant Details API ability to call from the client side (internally without passing secrets)
const GetLDBConsultantDetails = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { gmcNumber, isFollowOnAppointment },
  } = req;

  const response = await getLDBConsultantDetails(
    gmcNumber as string,
    (isFollowOnAppointment as string) == 'true' ? true : false
  ); // e.g. "4113571", "true"
  return res.status(200).json(response);
};

export default GetLDBConsultantDetails;
