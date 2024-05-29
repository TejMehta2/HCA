import { NextRequest, NextFetchEvent } from 'next/server';
import middleware from 'lib/middleware';
import geolocationMiddleware from 'lib/geolocation-middleware';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  const response = geolocationMiddleware(req);
  if (response) return response;
  return middleware(req, ev);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 6. all root files inside /public
   */
  matcher: [
    '/',
    /*exclude Finder and sublevels as these are delegated to their own pages*/
    '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg|Finder/|webhooks/sitecore/|api-layer/|referrer/|PaymentForm|payment/status|paymentform/).*)',
  ],
};
