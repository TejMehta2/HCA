import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';
import { debug } from '@sitecore-jss/sitecore-jss-nextjs/middleware';

/**
 * This plugin rewrites any request URL to lowercase.
 */
class SmallcaseUrlPlugin implements MiddlewarePlugin {
  order = -2;

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const url = req.nextUrl.clone();
    const lowercasePath = url.pathname.toLowerCase();

    debug.redirects(
      `Smallcase redirect. order=${this.order}: Checking for redirect - url=${url}`
    );

    if (url.pathname !== lowercasePath) {
      url.pathname = lowercasePath;
      debug.redirects(`Smallcase redirect: will redirect to url=${url}`);
      return NextResponse.redirect(url, 308);
    }

    debug.redirects(
      `Smallcase redirect: no redirect, moving to the next plugin`
    );
    return res || NextResponse.next();
  }
}

export const smallcaseUrlPlugin = new SmallcaseUrlPlugin();
