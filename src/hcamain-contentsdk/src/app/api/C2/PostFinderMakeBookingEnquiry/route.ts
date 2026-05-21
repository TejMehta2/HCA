import { NextRequest, NextResponse } from 'next/server';
import {
  FinderMakeEnquiry,
  IFinderEnquiryFields,
} from 'lib/consultant-finder/API_C2';

// wrapper for C2 Make Booking Enquiry API ability to call from the client side (internally without passing secrets)
export async function POST(req: NextRequest) {
  //console.log('req.body', req.body);
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = undefined;
  }
  const demographics = body as IFinderEnquiryFields; // demographics of the patient
  //console.log(demographics);

  let response: unknown = '';

  if (demographics != undefined) {
    response = await FinderMakeEnquiry(demographics);
  } else {
    //PostFinderMakeBookingEnquiry call failed
    const returnData = `{"errorCode": 998, "errorText": "missing parameters submitting the form"}`;
    response = JSON.parse(returnData);
    console.warn(`PostFinderMakeBookingEnquiry missing form params`);
  }

  return NextResponse.json(response, { status: 200 });
}
