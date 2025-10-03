import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';
import { debug } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { get } from '@vercel/edge-config';

type RedirectValue = {
  to: string;
  c: number; // redirect status code (301/302)
  pq?: boolean; // preserve querystring; if false or null -> do NOT merge QS
};

export class RedirectsEdgeConfigPlugin implements MiddlewarePlugin {
  // Run early in the middleware chain (after lowercase normalization + multisite).
  // siteName resolution is based on the cookie set by multisite middleware
  order = 0;

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const disableRedirects = process.env.DisableRedirects === '1';
    const response = res || NextResponse.next();

    // Skip if disabled - no need to redirect in sitecore.
    if (disableRedirects) return response;

    // Skip during Next.js production build phase
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      return response;
    }

    try {
      const url = new URL(req.url);
      const siteName = this.resolveSiteName(req);

      debug.redirects(`HCA Redirects (EC): resolved siteName=${siteName}`);

      if (!siteName) return response;

      const key = this.buildKey(url, siteName);
      if (!key) {
        // Key too long - skip redirect
        return response;
      }

      debug.redirects(`HCA Redirects (EC): lookup key=${key}`);
      debug.redirects(req);

      // Single key lookup in Edge Config
      const hit = await get<RedirectValue>(key);

      if (hit?.to) {
        //if redirect type is not set, then it's 301 (saving some space in edge config)
        const code = hit.c ?? 301;

        // Build the destination URL relative to current origin
        const destUrl = new URL(hit.to, url.origin);

        // Merge querystring params from the source URL into the destination
        if (hit.pq !== false) {
          this.mergeQueryStrings(url, destUrl);
        }

        debug.redirects(`HCA Redirects (EC): redirect to=${destUrl} (${code})`);

        const r = NextResponse.redirect(destUrl, code);
        return r;
      }
    } catch (err) {
      debug.redirects('HCA Redirects (EC): error', err);
    }

    return response;
  }

  // Resolve site name: Check for 'sc_site' cookie (set by multisite middleware)
  private resolveSiteName(req: NextRequest): string | null {
    const c = req.cookies.get('sc_site')?.value;
    if (!c) return null;
    const v = c.trim().replace(/^"+|"+$/g, '');
    return v || null;
  }

  /**
   * Build redirect key consistent with .NET sync logic:
   * - Normalize: lowercase, strip trailing slash
   * - Apply token replacements
   * - replace all characters outside [A-Za-z0-9_-] with '_'
   * - Prefix with "red_<siteName>_"
   * - Enforce 256-char limit; return empty string if exceeded
   */
  private buildKey(url: URL, siteName: string): string {
    let path = url.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    let keyBody = path
      .toLowerCase()
      .replaceAll('/', '___')
      .replaceAll('%', '__pr__')
      .replaceAll(';', '__sq__')
      .replaceAll('?', '__qm__')
      .replaceAll('=', '__eq__');

    keyBody = keyBody.replace(/[^A-Za-z0-9_-]/g, '_');

    const key = `red_${siteName}_${keyBody}`;
    if (key.length > 256) {
      debug.redirects(`HCA Redirects (EC): redirect key too long key=${key}`);
      return '';
    }

    return key;
  }

  /**
   * Merge query string parameters from source URL into destination URL.
   * Only adds parameters that are not already present in destination.
   */
  private mergeQueryStrings(srcUrl: URL, destUrl: URL) {
    const sourceParams = new URLSearchParams(srcUrl.search);
    const destParams = new URLSearchParams(destUrl.search);
    for (const [k, v] of sourceParams.entries()) {
      if (!destParams.has(k)) destParams.append(k, v);
    }
    const s = destParams.toString();
    destUrl.search = s;
  }
}

export const redirectsEdgeConfigPlugin = new RedirectsEdgeConfigPlugin();
