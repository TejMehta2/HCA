import { NextRequest, NextResponse } from 'next/server';
import { getLDBFirstAppointmentDatas } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Get First Appointment API ability to call from the client side (internally without passing secrets)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gmcNumber = searchParams.getAll('gmcNumber'); // pass as individual gmcNumber=xx&gmcNumber=yy
  const gmcNumbers = searchParams.get('gmcNumbers'); // pass as comma separated gmcNumbers=xx,yy

  //console.log("gmcNumbers",gmcNumber as string[]);
  const response = await getLDBFirstAppointmentDatas(
    gmcNumber as string[],
    gmcNumbers as string
  ); // e.g. "4113571"

  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Cache-Control', 'max-age=60');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=180');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=360');
  return nextResponse;
}
