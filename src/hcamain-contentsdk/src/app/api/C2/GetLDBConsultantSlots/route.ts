import { NextRequest, NextResponse } from 'next/server';
import { getLDBConsultantSlots } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get Consultant Slots API ability to call from the client side (internally without passing secrets)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const isFollowOnAppointment = searchParams.get('isFollowOnAppointment');
  const consultantGUID = searchParams.get('consultantGUID');
  const locationGUID = searchParams.get('locationGUID');
  const hCAConsultantId = searchParams.get('hCAConsultantId');
  const locationId = searchParams.get('locationId');

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

  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Cache-Control', 'max-age=10');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=60');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=120');
  return nextResponse;
}
