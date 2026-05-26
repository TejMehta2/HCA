import { get } from '@vercel/edge-config';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  debug,
  ProxyBase,
  type ProxyBaseConfig,
} from '@sitecore-content-sdk/nextjs/proxy';

type RedirectValue = {
  to: string;
  c?: number;
  pq?: boolean;
};

export class RedirectsEdgeConfigProxy extends ProxyBase {
  constructor(config: ProxyBaseConfig) {
    super(config);
  }

  async handle(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    if (process.env.DisableRedirects === '1') {
      return res;
    }

    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      return res;
    }

    if (this.disabled(req, res)) {
      return res;
    }

    try {
      const url = new URL(req.url);
      debug.redirects(`HCA Redirects: processing redirect for url=${url}`);

      const siteName = this.resolveSiteName(req, res);

      if (!siteName) {
        return res;
      }

      const key = this.buildKey(url, siteName);

      if (!key) {
        return res;
      }

      debug.redirects(`HCA Redirects: lookup key=${key}`);

      const hit = await get<RedirectValue>(key);

      if (!hit?.to) {
        return res;
      }

      const code = hit.c ?? 301;
      const destUrl = new URL(hit.to, url.origin);

      if (hit.pq !== false) {
        this.mergeQueryStrings(url, destUrl);
      }

      debug.redirects(`HCA Redirects: redirect to = ${destUrl} (${code})`);

      return NextResponse.redirect(destUrl, { status: code });
    } catch (error) {
      debug.redirects('HCA Redirects: error', error);
      return res;
    }
  }

  private resolveSiteName(req: NextRequest, res: NextResponse): string | null {
    let site = req.cookies.get('sc_site')?.value?.trim() || null;

    if (!site) {
      site = res.cookies.get('sc_site')?.value?.trim() || null;
    }

    if (!site) {
      const rewriteHeader =
        req.headers.get('x-sc-rewrite') ?? res.headers.get('x-sc-rewrite');

      const match = rewriteHeader?.match(/\/?_site_([^/]+)(?:\/|$)/i);
      site = match?.[1] ?? null;
    }

    debug.redirects(`HCA Redirects: resolved site = ${site}`);

    return site || null;
  }

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
      debug.redirects(`HCA Redirects: redirect key too long key=${key}`);
      return '';
    }

    return key;
  }

  private mergeQueryStrings(srcUrl: URL, destUrl: URL) {
    const sourceParams = new URLSearchParams(srcUrl.search);
    const destParams = new URLSearchParams(destUrl.search);

    for (const [key, value] of sourceParams.entries()) {
      if (!destParams.has(key)) {
        destParams.append(key, value);
      }
    }

    destUrl.search = destParams.toString();
  }
}
