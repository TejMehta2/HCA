import {
  splitAddress,
  type ISplitAddressFields,
} from 'lib/consultant-finder/API_HCA';
import { type NextRequest, NextResponse } from 'next/server';

// wrapper for integration layer postcode lookup API
// call e.g. https://www.hcacloud.localhost/api/locationAPI/SplitAddress?monikerField=7.730sOGBRDwPoBwAAAAABAwEAAAAAptP8UgAhEAIAAAAAAAAAAAD..2QAAAAA.....wAAAAAAAAAAAAAAAAAAAFROMjMgM0RTAAAAAAA-
const SplitAddress = async (req: NextRequest): Promise<Response> => {
  let fieldBody: ISplitAddressFields | undefined;
  try {
    fieldBody = req.body ? ((await req.json()) as ISplitAddressFields) : undefined;
  } catch {
    fieldBody = undefined;
  }

  const fieldParams: ISplitAddressFields | unknown = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  ); // destruct if passed as query params
  const params: ISplitAddressFields =
    fieldBody || (fieldParams as ISplitAddressFields);
  console.log('SplitAddressFields params...', params);
  const response = await splitAddress(params);
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Content-Type', 'application/json');
  nextResponse.headers.set('Cache-Control', 'max-age=600');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=1800');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');
  return nextResponse;
};

export async function GET(req: NextRequest) {
  return SplitAddress(req);
}

export async function POST(req: NextRequest) {
  return SplitAddress(req);
}

export async function PUT(req: NextRequest) {
  return SplitAddress(req);
}

export async function PATCH(req: NextRequest) {
  return SplitAddress(req);
}

export async function DELETE(req: NextRequest) {
  return SplitAddress(req);
}

export async function HEAD(req: NextRequest) {
  return SplitAddress(req);
}

export async function OPTIONS(req: NextRequest) {
  return SplitAddress(req);
}
