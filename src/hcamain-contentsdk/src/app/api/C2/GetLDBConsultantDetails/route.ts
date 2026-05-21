import { NextRequest, NextResponse } from 'next/server';
import { getLDBConsultantDetails } from 'lib/consultant-finder/API_C2';
import { revalidate } from 'lib/consultant-finder/revalidateNow';

// wrapper for C2 Get Consultant Details API ability to call from the client side (internally without passing secrets)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gmcNumber = searchParams.get('gmcNumber');
  const isFollowOnAppointment = searchParams.get('isFollowOnAppointment');

  const response = await getLDBConsultantDetails(
    gmcNumber as string,
    isFollowOnAppointment?.toString() === 'true' ? true : false
  ); // e.g. "4113571", "true"

  const nextResponse = NextResponse.json(response, { status: 200 });

  if (revalidate.now() || revalidate.noCache()) {
    nextResponse.headers.set('Cache-Control', 'no-cache');
    nextResponse.headers.set('CDN-Cache-Control', 'no-cache');
    nextResponse.headers.set('Vercel-CDN-Cache-Control', 'no-cache');
  } else {
    nextResponse.headers.set('Cache-Control', 'max-age=600');
    nextResponse.headers.set('CDN-Cache-Control', 'max-age=1800');
    nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');
  }

  return nextResponse;
}
