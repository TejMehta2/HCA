import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

const redirectMiddleware = async (req: NextRequest) => {
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    try {
      // Custom redirect if response from API is valid and has a destination
      const { url } = req;
      const { pathname, search } = new URL(url);

      console.log(
        `redirect 1: url ${url}, pathname: ${pathname}, search: ${search}`
      );

      const apiUrl = new URL(
        `${process.env.INTEGRATION_LAYER_URL}/redirects/find?source=${pathname}`
      );

      console.log(`redirect 2: apiUrl ${JSON.stringify(apiUrl)}`);
      const response = await fetch(apiUrl.href, { next: { revalidate: 3600 } });
      console.log(`redirect 3: apiUrl ${JSON.stringify(response)}`);

      if (response.ok) {
        const data = await response.json();
        if (data.destination) {
          const redirectUrl = new URL(data.destination, req.url);
          redirectUrl.search = search;
          console.log(
            `redirect 4: url ${url}, pathname: ${pathname},  search: ${search}`
          );
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
