import { NextRequest, NextFetchEvent } from 'next/server';
import middleware from 'lib/middleware';
import { smallcaseurlMiddleware } from 'lib/middleware/smallcase-url-Middleware';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  const lowercaseRespone = smallcaseurlMiddleware(req);
  if (lowercaseRespone) return lowercaseRespone;

  // test for exclusions e.g. finder and payments
  const url = req.nextUrl.clone();
  const pathname = url.pathname.toLowerCase();
  if (
    pathname.startsWith('/finder') ||
    pathname.startsWith('/payment') ||
    pathname.startsWith('/ivf-pricer') ||
    pathname.startsWith('/fertility-calculator')
  )
    return undefined;
  else return middleware(req, ev);
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
    '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|favicon|android-chrome-*|sc_logo.svg|webhooks/sitecore/|api-layer/|referrer/|careers/vacancy/).*)',
  ],
};
