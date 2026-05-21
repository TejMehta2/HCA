import {
  type IEnquiryFormFields,
  submitBookingEnquiry,
} from 'lib/consultant-finder/API_HCA';
import { type NextRequest, NextResponse } from 'next/server';

// wrapper for forms api call to make booking enquiry, ability to call from the client side (internally without passing secrets)
const PostMakeBookingEnquiry = async (req: NextRequest): Promise<NextResponse> => {
  let fields: IEnquiryFormFields;
  try {
    fields = req.body
      ? ((await req.json()) as IEnquiryFormFields)
      : (undefined as unknown as IEnquiryFormFields);
  } catch {
    fields = undefined as unknown as IEnquiryFormFields;
  }
  const response = await submitBookingEnquiry(fields);
  //console.log('response from post booking enquiry:', response);
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Content-Type', 'application/json');
  return nextResponse;
};

export async function GET(req: NextRequest) {
  return PostMakeBookingEnquiry(req);
}

export async function POST(req: NextRequest) {
  return PostMakeBookingEnquiry(req);
}

export async function PUT(req: NextRequest) {
  return PostMakeBookingEnquiry(req);
}

export async function PATCH(req: NextRequest) {
  return PostMakeBookingEnquiry(req);
}

export async function DELETE(req: NextRequest) {
  return PostMakeBookingEnquiry(req);
}

export async function HEAD(req: NextRequest) {
  return PostMakeBookingEnquiry(req);
}

export async function OPTIONS(req: NextRequest) {
  return PostMakeBookingEnquiry(req);
}
