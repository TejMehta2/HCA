import { NextRequest, NextResponse } from 'next/server';
import { getLDBFirstAppointmentDatas } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get First Appointment API - get all the data
// ability to call from the client side (internally without passing secrets)
export async function GET(req: NextRequest) {
  if (!req) {
    console.error('error - no request found for GetLDBFirstAppointmentDataAll');
  }
  const response = await getLDBFirstAppointmentDatas([], ''); // no params - get all
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Cache-Control', 'max-age=3600');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=3600');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');
  return nextResponse;
}
