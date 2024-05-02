import { NextRequest, NextResponse } from 'next/server';

const geolocationMiddleware = (req: NextRequest) => {
  try {
    const { nextUrl: url, geo } = req;

    if (!url.searchParams.has('near') && geo?.city) {
      const city = geo?.city || 'London';
      url.searchParams.set('near', `${city}`);
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.log(error);
  }
  return;
};

export default geolocationMiddleware;
