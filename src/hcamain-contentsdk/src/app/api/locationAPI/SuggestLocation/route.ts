import {
  type ISuggestLocationFields,
  suggestLocation,
} from 'lib/consultant-finder/API_HCA';
import { type NextRequest, NextResponse } from 'next/server';
//import { SuggestLocation } from 'lib/consultant-finder/HCA';

// wrapper for integration layer location API
const SuggestLocation = async (req: NextRequest): Promise<Response> => {
  let fieldBody: ISuggestLocationFields | undefined;
  try {
    fieldBody = req.body ? ((await req.json()) as ISuggestLocationFields) : undefined;
  } catch {
    fieldBody = undefined;
  }

  const fieldParams: ISuggestLocationFields | unknown = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  ); // destruct if passed as query params
  const params: ISuggestLocationFields = fieldBody || (fieldParams as ISuggestLocationFields);
  console.log('SuggestLocation params...', params);
  const response = await suggestLocation(params);
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Content-Type', 'application/json');
  nextResponse.headers.set('Cache-Control', 'max-age=600');
  nextResponse.headers.set('CDN-Cache-Control', 'max-age=1800');
  nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');
  return nextResponse;
};

export async function GET(req: NextRequest) {
  return SuggestLocation(req);
}

export async function POST(req: NextRequest) {
  return SuggestLocation(req);
}

export async function PUT(req: NextRequest) {
  return SuggestLocation(req);
}

export async function PATCH(req: NextRequest) {
  return SuggestLocation(req);
}

export async function DELETE(req: NextRequest) {
  return SuggestLocation(req);
}

export async function HEAD(req: NextRequest) {
  return SuggestLocation(req);
}

export async function OPTIONS(req: NextRequest) {
  return SuggestLocation(req);
}
