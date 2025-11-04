import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

const redirectMiddleware = async (req: NextRequest) => {
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    try {
      // Custom redirect if response from API is valid and has a destination
      const { url } = req;
      const { pathname, search } = new URL(url);

      // console.log(
      //   `redirect 1: url ${url}, pathname: ${pathname}, search: ${search}`
      // );

      const apiUrl = new URL(
        `${req.nextUrl.origin}${
          process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH
        }/redirects/find?source=${pathname.toLowerCase()}`
      );

      // console.log(`redirect 2: apiUrl ${JSON.stringify(apiUrl)}`);
      const response = await fetch(apiUrl.href, { next: { revalidate: 3600 } });
      // console.log(`redirect 3: ok?${response.ok}`);

      if (response.ok) {
        //&& (await response.bodyUsed)
        const text1 = await response.text();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let data: any = {};
        if (text1.length > 0) {
          data = JSON.parse(text1);
          // console.log('data', data);
          //const data = await response.json();
          if (data.destination) {
            const redirectUrl = new URL(data.destination, req.url);
            redirectUrl.search = search;
            // console.log(
            //   `redirect 4: url ${url}, pathname: ${pathname},  search: ${search}`
            // );
            return NextResponse.redirect(redirectUrl);
          }
        }
      } else {
        console.log('redirect 5:', JSON.stringify(response));
        throw response.statusText;
      }
    } catch (error) {
      console.log('Redirect Middleware error: ', error);
      process.env.NODE_ENV === 'development' &&
        console.error('Redirect Middleware : ', error);
    }
  }
  //console.log('Redirect Middleware end');
  return NextResponse.next();
};

export default redirectMiddleware;
