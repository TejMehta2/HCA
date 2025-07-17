import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';
import { debug } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';

interface RedirectCacheEntry {
  redirectUrl: URL | null;
  statusCode?: number;
  timestamp: number;
}

/*
 * HCA Redirects plugin.
 * Calls redis via Integration Layer to check for a redirect
 * In-memory cache for redirects to minimize database calls
 */
const redirectCache = new Map<string, RedirectCacheEntry>();
// Cache TTL in milliseconds (default 1 hour)
const CACHE_TTL = Number(process.env.REDIRECT_CACHE_TTL_MS) || 3600000;

class HcaRedirectsPlugin implements MiddlewarePlugin {
  order = 0; // Run early, after lowercase normalization

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const response = res || NextResponse.next();

    const { url } = req;
    const { pathname, search } = new URL(url);

    // Expose cache on special debug path
    if (pathname === '/__debug/redirect-cache') {
      const params = new URLSearchParams(search);
      // Clear cache if requested
      if (params.has('clearcache')) {
        redirectCache.clear();
        debug.redirects('HCA Redirects: Cache cleared via debug endpoint');
      }

      // Return cache entries ordered by key
      const entries = Array.from(redirectCache.entries())
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, { redirectUrl, statusCode, timestamp }]) => ({
          key,
          redirectUrl: redirectUrl?.toString() ?? null,
          statusCode: statusCode ?? null,
          timestamp: new Date(timestamp).toISOString(),
        }));
      return NextResponse.json({ entries });
    }

    // Skip during production build
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      return response;
    }

    try {
      const cacheKey = pathname.toLowerCase() + search;
      const now = Date.now();

      debug.redirects(
        `HCA Redirects: Checking for redirect - url=${url}, pathname=${pathname}, search=${search}`
      );

      // Check in-memory cache first
      const cached = redirectCache.get(cacheKey);

      if (cached && now - cached.timestamp < CACHE_TTL) {
        debug.redirects(`HCA Redirects: Cache hit for ${cacheKey}`);
        if (cached.redirectUrl) {
          debug.redirects(
            `HCA Redirects: Redirecting (from cache) to ${cached.redirectUrl}`
          );
          return NextResponse.redirect(cached.redirectUrl, cached.statusCode);
        }
        debug.redirects('HCA Redirects: No redirect needed (from cache)');
        return response;
      }

      // Construct Integration Layer API URL
      //`https://www.hcahealthcareqa.co.uk/api/api-layer/redirects/find?source=${pathname.toLowerCase()}`
      const proxyPath = process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH;
      const apiUrl = new URL(
        `${req.nextUrl.origin}${proxyPath}/redirects/find?source=${pathname.toLowerCase()}`
      );

      debug.redirects(
        `HCA Redirects: Fetching redirect data from ${apiUrl.href}`
      );

      // Perform fetch without automatic Next.js middleware caching
      const apiResponse = await fetch(apiUrl.href);
      debug.redirects(`HCA Redirects: API response ok? ${apiResponse.ok}`);

      let redirectUrl: URL | null = null;
      let statusCode: number | undefined;

      if (apiResponse.ok) {
        const responseText = await apiResponse.text();

        if (responseText.length > 0) {
          const body = JSON.parse(responseText);

          // Expected response: { source: string, destination: string, statusCode: number }
          if (body?.destination) {
            redirectUrl = new URL(body.destination, req.nextUrl.origin);
            statusCode = body.statusCode || 301;

            // Merge original query params into destination
            const sourceParams = new URLSearchParams(search);
            const destParams = new URLSearchParams(redirectUrl.search);
            for (const [key, value] of sourceParams.entries()) {
              if (!destParams.has(key)) {
                destParams.append(key, value);
              }
            }
            redirectUrl.search = destParams.toString();

            debug.redirects(
              `HCA Redirects: Redirecting to ${redirectUrl} (${statusCode})`
            );

            // Cache the redirect result
            redirectCache.set(cacheKey, {
              redirectUrl,
              statusCode,
              timestamp: now,
            });

            return NextResponse.redirect(redirectUrl, statusCode);
          }
        }
      }
    } catch (error) {
      debug.redirects('HCA Redirects: Middleware error', error);
    }

    debug.redirects('HCA Redirects: No redirect needed');
    return response;
  }
}

export const hcaRedirectsPlugin = new HcaRedirectsPlugin();
