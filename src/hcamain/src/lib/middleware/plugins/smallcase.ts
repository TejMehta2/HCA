import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';

/**
 * This plugin rewrites any request URL to lowercase.
 */
class SmallcaseUrlPlugin implements MiddlewarePlugin {
  order = -2; // Run before multisite, as it normalizes the URL

  async exec(req: NextRequest): Promise<NextResponse> {
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    if (pathname !== pathname.toLowerCase()) {
      url.pathname = pathname.toLowerCase();

      // Rewriting to lowercase version of the path
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
}

export const smallcaseUrlPlugin = new SmallcaseUrlPlugin();
