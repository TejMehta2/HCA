import { type NextRequest } from 'next/server';

type RouteContext = {
  params: Promise<{
    slug?: string[];
  }>;
};

type ProxyRequestInit = RequestInit & {
  duplex?: 'half';
};

function getErrorBody(err: unknown): BodyInit | null {
  if (err === null || err === undefined) {
    return null;
  }

  if (typeof err === 'object' || typeof err === 'number' || typeof err === 'boolean') {
    return JSON.stringify(err);
  }

  return String(err);
}

// Proxy requests to remote integration API layer
async function handler(req: NextRequest, context: RouteContext) {
  try {
    const method = req.method || 'GET';
    const { slug } = await context.params;

    // Construct remote request URL
    const path = slug?.join('/');
    const remoteRequestUrl = new URL(path as string, process.env.INTEGRATION_LAYER_URL);

    // Forward original URL query to remote request URL
    remoteRequestUrl.search = req.nextUrl.searchParams.toString() || '';

    // fetch from remote integration layer server
    const headers = new Headers(req.headers);
    headers.delete('host');
    headers.delete('referer');

    const fetchOptions: ProxyRequestInit = {
      method,
      headers,
    };

    if (method !== 'GET' && req.body) {
      fetchOptions.body = req.body;
      fetchOptions.duplex = 'half';
    }

    const response = await fetch(remoteRequestUrl.href, fetchOptions);

    if (!response.ok || !response.body) {
      throw `unexpected response ${response.statusText} at ${remoteRequestUrl} (${req.url})`;
    }

    return new Response(response.body);
  } catch (err) {
    console.log(err); // log to server
    return new Response(getErrorBody(err), { status: 500 });
  }
}

export async function GET(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function POST(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function HEAD(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function OPTIONS(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}
