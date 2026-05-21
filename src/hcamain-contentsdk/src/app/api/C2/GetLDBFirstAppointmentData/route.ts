import { NextRequest, NextResponse } from 'next/server';
import { getLDBFirstAppointmentData } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get First Appointment API ability to call from the client side (internally without passing secrets)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gmcNumber = searchParams.get('gmcNumber');

  const response = await getLDBFirstAppointmentData(gmcNumber as string); // e.g. "4113571"
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Cache-Control', 'max-age=60');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=180');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=360');
  return nextResponse;
}
