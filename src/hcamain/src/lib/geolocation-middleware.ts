import { NextRequest, NextResponse } from 'next/server';

const geolocationMiddleware = (req: NextRequest) => {
  try {
    const { geo } = req;
    if (!req.cookies.has('near')) {
      const city = geo?.city || 'London';
      const response = NextResponse.next();
      response.cookies.set('near', city, {
        httpOnly: false,
      });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
  return;
};

export default geolocationMiddleware;
