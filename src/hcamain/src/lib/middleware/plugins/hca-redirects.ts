import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';
import { debug } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';

/**
 * HCA Redirects plugin.
 * Calls redis via Integration Layer to check for a redirect
 */
class HcaRedirectsPlugin implements MiddlewarePlugin {
  order = 0; // Run early, after lowercase normalization

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const response = res || NextResponse.next();

    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      return response;
    }

    try {
      const { url } = req;
      const { pathname, search } = new URL(url);

      debug.redirects(
        `HCA Redirects: Checking for redirect - url=${url}, pathname=${pathname}, search=${search}`
      );

      const proxyPath = process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH;
      const apiUrl = new URL(
        `${
          req.nextUrl.origin
        }${proxyPath}/redirects/find?source=${pathname.toLowerCase()}`
      );

      debug.redirects(
        `HCA Redirects: Fetching redirect data from ${apiUrl.href}`
      );

      const apiResponse = await fetch(apiUrl.href, {
        next: { revalidate: 3600 },
      });

      debug.redirects(`HCA Redirects: API response ok? ${apiResponse.ok}`);

      if (apiResponse.ok) {
        const body = await apiResponse.text();

        if (body.length > 0) {
          const data = JSON.parse(body);

          debug.redirects(
            `HCA Redirects: API response data - ${JSON.stringify(data)}`
          );

          if (data.destination) {
            const redirectUrl = new URL(data.destination, req.url);

            const sourceParams = new URLSearchParams(search);
            const destParams = new URLSearchParams(redirectUrl.search);

            debug.redirects(
              `HCA Redirects: sourceParams ${search}, destParams ${redirectUrl.search}`
            );

            // Merge params: destParams override sourceParams
            for (const [key, value] of sourceParams.entries()) {
              if (!destParams.has(key)) {
                destParams.append(key, value);
              }
            }

            // Set the merged search params back to the redirectUrl
            redirectUrl.search = destParams.toString();

            debug.redirects(`HCA Redirects: Redirecting to ${redirectUrl}`);

            return NextResponse.redirect(redirectUrl);
          }
        }
      } else {
        debug.redirects(
          `HCA Redirects: API error response - ${JSON.stringify(apiResponse)}`
        );
        throw new Error(apiResponse.statusText);
      }
    } catch (error) {
      debug.redirects('HCA Redirects: Middleware error', error);
    }

    debug.redirects('HCA Redirects: No redirect needed');
    return response;
  }
}

export const hcaRedirectsPlugin = new HcaRedirectsPlugin();
