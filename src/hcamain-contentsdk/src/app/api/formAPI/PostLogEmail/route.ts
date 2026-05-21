import { type ILogEmailFields, submitLogEmail } from 'lib/consultant-finder/API_HCA';
import { type NextRequest, NextResponse } from 'next/server';

// wrapper for forms api call to log to an email, ability to call from the client side (internally without passing secrets)
const PostLogEmail = async (req: NextRequest): Promise<NextResponse> => {
  let fields: ILogEmailFields;
  try {
    fields = req.body
      ? ((await req.json()) as ILogEmailFields)
      : (undefined as unknown as ILogEmailFields);
  } catch {
    fields = undefined as unknown as ILogEmailFields;
  }
  const response = await submitLogEmail(fields);
  console.log('response from post log email:', response);
  const nextResponse = NextResponse.json(response, { status: 200 });
  nextResponse.headers.set('Content-Type', 'application/json');
  return nextResponse;
};

export async function GET(req: NextRequest) {
  return PostLogEmail(req);
}

export async function POST(req: NextRequest) {
  return PostLogEmail(req);
}

export async function PUT(req: NextRequest) {
  return PostLogEmail(req);
}

export async function PATCH(req: NextRequest) {
  return PostLogEmail(req);
}

export async function DELETE(req: NextRequest) {
  return PostLogEmail(req);
}

export async function HEAD(req: NextRequest) {
  return PostLogEmail(req);
}

export async function OPTIONS(req: NextRequest) {
  return PostLogEmail(req);
}
