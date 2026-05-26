import { ProxyHandler } from '@sitecore-content-sdk/nextjs/proxy';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export class SmallcaseUrlProxy extends ProxyHandler {
  async handle(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    const { pathname, origin, search } = req.nextUrl;
    const redirected = req.headers.get('x-redirected');

    if (pathname === pathname.toLowerCase() || redirected === 'true') {
      return res;
    }

    const lowercaseUrl = new URL(`${origin}${pathname.toLowerCase()}${search}`);
    const response = NextResponse.redirect(lowercaseUrl, {
      status: 301,
      statusText: 'Moved Permanently',
      headers: res.headers,
    });

    response.headers.set('x-redirected', 'true');

    return response;
  }
}
