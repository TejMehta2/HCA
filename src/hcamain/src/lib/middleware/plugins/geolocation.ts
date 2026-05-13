import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';

/**
 * Geolocation plugin that sets a `near` cookie with the user's city
 * if it doesn't already exist.
 */
class GeolocationPlugin implements MiddlewarePlugin {
  order = 10; // Run after multisite and redirect, but before personalization

  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    try {
      const response = res || NextResponse.next();
      const { geo } = req;

      if (!req.cookies.has('near')) {
        const isUK = geo?.country === 'GB';

        //set city only when in the UK. When outside default to London.
        const city = isUK ? geo?.city || 'London' : 'London';

        response.cookies.set('near', city, {
          httpOnly: false,
        });
      }

      return response;
    } catch (error) {
      console.error('[GeolocationPlugin] Error setting geo cookie:', error);
      return res || NextResponse.next();
    }
  }
}

export const geolocationPlugin = new GeolocationPlugin();
