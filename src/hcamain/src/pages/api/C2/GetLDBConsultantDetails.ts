import type { NextApiRequest, NextApiResponse } from 'next';
import { getLDBConsultantDetails } from 'lib/consultant-finder/API_C2';
import { revalidate } from 'lib/consultant-finder/revalidateNow';

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
    isFollowOnAppointment?.toString() === 'true' ? true : false
  ); // e.g. "4113571", "true"
  if (revalidate.now() || revalidate.noCache()) {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('CDN-Cache-Control', 'no-cache');
    res.setHeader('Vercel-CDN-Cache-Control', 'no-cache');
  } else {
    res.setHeader('Cache-Control', 'max-age=600');
    res.setHeader('CDN-Cache-Control', 'max-age=1800');
    res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  }

  return res.status(200).json(response);
};

export default GetLDBConsultantDetails;
