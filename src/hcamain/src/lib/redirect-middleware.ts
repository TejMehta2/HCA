import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

const redirectMiddleware = async (req: NextRequest) => {
  //console.error('process.env.NEXT_PHASE : ', process.env.NEXT_PHASE);
  //console.error('PHASE_PRODUCTION_BUILD : ', PHASE_PRODUCTION_BUILD);
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    try {
      // Custom redirect if response from API is valid and has a destination
      const { url } = req;
      const { pathname, search } = new URL(url);
      //console.error('url : ', url);

      const apiUrl = new URL(
        `${process.env.INTEGRATION_LAYER_URL}/redirects/find?source=${pathname}`
      );

      //console.log('apiUrl.href', apiUrl.href);
      const response = await fetch(apiUrl.href, { next: { revalidate: 3600 } });
      if (response.ok) {
        //console.log('response', response.ok);
        const data = await response.json();
        //console.log('response.json', response.json);
        if (data.destination) {
          //console.log('data.destination', data.destination);
          const redirectUrl = new URL(data.destination, req.url);
          redirectUrl.search = search;
          //console.log('redirectUrl', redirectUrl);
          return NextResponse.redirect(redirectUrl);
        }
      } else {
        console.log('response.statusText', response.statusText);
        throw response.statusText;
      }
    } catch (error) {
      console.error('Redirect Middleware : ', error);
    }
  }
  return;
};

export default redirectMiddleware;
