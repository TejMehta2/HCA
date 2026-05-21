import { findAddress, type IFindAddressFields } from 'lib/consultant-finder/API_HCA';
import { type NextRequest, NextResponse } from 'next/server';

// wrapper for integration layer postcode lookup API
// call e.g. https://www.hcacloud.localhost/api/locationAPI/FindAddress?postCode=TN233DS
const FindAddress = async (req: NextRequest): Promise<Response> => {
  let fieldBody: IFindAddressFields | undefined;
  try {
    fieldBody = req.body ? ((await req.json()) as IFindAddressFields) : undefined;
  } catch {
    fieldBody = undefined;
  }

  const fieldParams: IFindAddressFields | unknown = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  ); // destruct if passed as query params
  const params: IFindAddressFields =
    fieldBody || (fieldParams as IFindAddressFields);
  console.log('FindAddressFields params...', params);
  const response = await findAddress(params);
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Content-Type', 'application/json');
  nextResponse.headers.set('Cache-Control', 'max-age=600');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=1800');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');
  return nextResponse;
};

export async function GET(req: NextRequest) {
  return FindAddress(req);
}

export async function POST(req: NextRequest) {
  return FindAddress(req);
}

export async function PUT(req: NextRequest) {
  return FindAddress(req);
}

export async function PATCH(req: NextRequest) {
  return FindAddress(req);
}

export async function DELETE(req: NextRequest) {
  return FindAddress(req);
}

export async function HEAD(req: NextRequest) {
  return FindAddress(req);
}

export async function OPTIONS(req: NextRequest) {
  return FindAddress(req);
}
