import { NextRequest } from 'next/server';

type RouteContext = {
  params: Promise<{
    slug?: string[];
  }>;
};

export const dynamic = 'force-dynamic';

async function proxyRequest(request: NextRequest, context: RouteContext) {
  try {
    const integrationLayerUrl = process.env.INTEGRATION_LAYER_URL;

    if (!integrationLayerUrl) {
      return new Response('INTEGRATION_LAYER_URL is not configured', {
        status: 500,
      });
    }

    const { slug } = await context.params;
    const path = slug?.join('/') ?? '';
    const remoteRequestUrl = new URL(path, integrationLayerUrl);
    remoteRequestUrl.search = request.nextUrl.search;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('referer');

    const method = request.method;
    const body =
      method === 'GET' || method === 'HEAD'
        ? undefined
        : await request.arrayBuffer();

    const response = await fetch(remoteRequestUrl.href, {
      method,
      body,
      headers,
      cache: 'no-store',
    });

    if (!response.ok || !response.body) {
      throw new Error(
        `Unexpected response ${response.statusText} at ${remoteRequestUrl} (${request.url})`
      );
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(String(error), { status: 500 });
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}
