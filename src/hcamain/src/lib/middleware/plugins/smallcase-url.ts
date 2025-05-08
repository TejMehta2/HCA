import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';

/**
 * This plugin rewrites any request URL to lowercase.
 */
class SmallcaseUrlPlugin implements MiddlewarePlugin {
  order = -2; // Run before multisite, as it normalizes the URL

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    console.log(
      `Smallcase redirect. order=${this.order}: Checking for redirect - url=${url}, pathname=${pathname}`
    );

    if (pathname !== pathname.toLowerCase()) {
      url.pathname = pathname.toLowerCase();

      console.log(
        `Smallcase redirect: will redirect to  - url.pathname=${url.pathname}`
      );

      // Rewriting to lowercase version of the path
      return NextResponse.redirect(url);
    }

    console.log(`Smallcase redirect: moving to the next plugin`);
    return res || NextResponse.next();
  }
}

export const smallcaseUrlPlugin = new SmallcaseUrlPlugin();
