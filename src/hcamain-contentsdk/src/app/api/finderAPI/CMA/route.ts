import { getCMA } from 'lib/consultant-finder/API_HCA';
import { type NextRequest } from 'next/server';

function toResponseBody(body: unknown): BodyInit | null {
  if (body === null || body === undefined) {
    return null;
  }

  if (
    typeof body === 'object' ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  ) {
    return JSON.stringify(body);
  }

  return body as BodyInit;
}

function isJsonLikeBody(body: unknown) {
  return (
    typeof body === 'object' ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  );
}

// wrapper for CMA profile query
const GetCMAData = async (req: NextRequest): Promise<Response> => {
  const cmaId = req.nextUrl.searchParams.get('cmaId') ?? undefined;
  //console.log('cmaId', cmaId);
  const ret = await getCMA(cmaId as string);
  const headers = new Headers({
    'Cache-Control': 'max-age=600',
    'CDN-Cache-Control': 'max-age=1800',
    'Vercel-CDN-Cache-Control': 'max-age=3600',
    'Content-Type': 'text/html',
  });

  if (ret !== null && ret !== undefined && isJsonLikeBody(ret)) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  return new Response(toResponseBody(ret), {
    status: 200,
    headers,
  });
};

export async function GET(req: NextRequest) {
  return GetCMAData(req);
}

export async function POST(req: NextRequest) {
  return GetCMAData(req);
}

export async function PUT(req: NextRequest) {
  return GetCMAData(req);
}

export async function PATCH(req: NextRequest) {
  return GetCMAData(req);
}

export async function DELETE(req: NextRequest) {
  return GetCMAData(req);
}

export async function HEAD(req: NextRequest) {
  return GetCMAData(req);
}

export async function OPTIONS(req: NextRequest) {
  return GetCMAData(req);
}
