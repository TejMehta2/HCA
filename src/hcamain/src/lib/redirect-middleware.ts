import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

const redirectMiddleware = async (req: NextRequest) => {
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    try {
      // Custom redirect if response from API is valid and has a destination
      const { url } = req;
      const { pathname, search } = new URL(url);

      const apiUrl = new URL(
        `${process.env.INTEGRATION_LAYER_URL}/redirects/find?source=${pathname}`
      );
      const response = await fetch(apiUrl.href, { next: { revalidate: 3600 } });
      if (response.ok) {
        const data = await response.json();
        if (data.destination) {
          const redirectUrl = new URL(data.destination, req.url);
          redirectUrl.search = search;
          return NextResponse.redirect(redirectUrl);
        }
      } else {
        throw response.statusText;
      }
    } catch (error) {
      process.env.NODE_ENV === 'development' &&
        console.error('Redirect Middleware : ', error);
    }
  }
  return;
};

export default redirectMiddleware;
