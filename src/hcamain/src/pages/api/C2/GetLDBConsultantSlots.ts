import type { NextApiRequest, NextApiResponse } from 'next';
import { getLDBConsultantSlots } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get Consultant Slots API ability to call from the client side (internally without passing secrets)
const GetLDBConsultantSlots = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: {
      dateFrom,
      dateTo,
      isFollowOnAppointment,
      consultantGUID,
      locationGUID,
      hCAConsultantId,
      locationId,
    },
  } = req;

  /*
console.log(
  dateFrom as string, dateTo as string, 
  (isFollowOnAppointment?.toString()) === 'true' ? true : false,
  (consultantGUID as string) ?? null, 
  (locationGUID as string) ?? null,
  (hCAConsultantId as string) ?? null,
  (locationId as string) ?? null
);
*/
  const response = await getLDBConsultantSlots(
    dateFrom as string,
    dateTo as string, // yyyy-mm-dd
    isFollowOnAppointment?.toString() === 'true' ? true : false, // true or false
    (consultantGUID as string) ?? null, // from GetLDBConsultantDetails
    (locationGUID as string) ?? null, // from GetLDBConsultantDetails
    (hCAConsultantId as string) ?? null, // GMC (deprecated use consultantGUID)
    (locationId as string) ?? null
  ); // Meditech Mnemonic (deprecated use locationGUID)
  res.setHeader('Cache-Control', 'max-age=10');
  res.setHeader('CDN-Cache-Control', 'max-age=60');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=120');
  return res.status(200).json(response);
};

export default GetLDBConsultantSlots;
