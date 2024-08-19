import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function smallcaseurlMiddleware(
  req: NextRequest
): NextResponse | undefined {
  const { pathname, origin, search } = req.nextUrl;
  const redirected = req.headers.get('x-redirected');

  // Check if the pathname is already in lowercase
  if (pathname === pathname.toLowerCase()) {
    return; // NextResponse.next(); // Continue to the next middleware or route handler
  }

  // Check if this request has already been redirected
  if (redirected === 'true') {
    return; // NextResponse.next(); // Break the loop by not redirecting again
  }

  // Redirect to the lowercase version of the pathname
  const lowercaseUrl = new URL(`${origin}${pathname.toLowerCase()}${search}`);
  const response = NextResponse.redirect(lowercaseUrl, 308);

  // Set custom header to indicate that a redirect has occurred
  response.headers.set('x-redirected', 'true');

  return response;
}
