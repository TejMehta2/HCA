import {
  getDistances,
  type IGetDistancesFields,
} from 'lib/consultant-finder/API_HCA';
import { type NextRequest, NextResponse } from 'next/server';

// wrapper for integration layer location API
/* e.g.
      provider, //e.g.:Google
      method, // e.g. Default
      units, //e.g. Kilometers
      order, // e.g. Default
      origin, // e.g. TN23%201DR
      originType, // e.g. Postcode
      destinations, //e.g.WD6%203BS%2C%20TN23%203DS
      destinationType, // e.g.Postcode 
*/
const GetDistances = async (req: NextRequest): Promise<Response> => {
  let fieldBody: IGetDistancesFields | undefined;
  try {
    fieldBody = req.body ? ((await req.json()) as IGetDistancesFields) : undefined;
  } catch {
    fieldBody = undefined;
  }

  const fieldParams: IGetDistancesFields | unknown = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  ); // destruct if passed as query params
  const params: IGetDistancesFields =
    fieldBody || (fieldParams as IGetDistancesFields);
  console.log('GetDistances params...', params);
  const response = await getDistances(params);
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Content-Type', 'application/json');
  nextResponse.headers.set('Cache-Control', 'max-age=600');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=1800');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');
  return nextResponse;
};

export async function GET(req: NextRequest) {
  return GetDistances(req);
}

export async function POST(req: NextRequest) {
  return GetDistances(req);
}

export async function PUT(req: NextRequest) {
  return GetDistances(req);
}

export async function PATCH(req: NextRequest) {
  return GetDistances(req);
}

export async function DELETE(req: NextRequest) {
  return GetDistances(req);
}

export async function HEAD(req: NextRequest) {
  return GetDistances(req);
}

export async function OPTIONS(req: NextRequest) {
  return GetDistances(req);
}
