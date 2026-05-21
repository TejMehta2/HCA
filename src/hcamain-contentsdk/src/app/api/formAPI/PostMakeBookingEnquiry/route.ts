import {
  IEnquiryFormFields,
  submitBookingEnquiry,
} from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';

// wrapper for forms api call to make booking enquiry, ability to call from the client side (internally without passing secrets)
const PostMakeBookingEnquiry = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const fields: IEnquiryFormFields = req.body as IEnquiryFormFields;
  const response = await submitBookingEnquiry(fields);
  res.setHeader('Content-Type', 'application/json');
  //console.log('response from post booking enquiry:', response);
  return res.status(200).json(response);
};

export default PostMakeBookingEnquiry;
