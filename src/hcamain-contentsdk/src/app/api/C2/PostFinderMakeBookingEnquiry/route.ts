import type { NextApiRequest, NextApiResponse } from 'next';
import {
  FinderMakeEnquiry,
  IFinderEnquiryFields,
} from 'lib/consultant-finder/API_C2';

// wrapper for C2 Make Booking Enquiry API ability to call from the client side (internally without passing secrets)
const PostFinderMakeBookingEnquiry = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  //console.log('req.body', req.body);
  const demographics = req.body as IFinderEnquiryFields; // demographics of the patient
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

  return res.status(200).json(response);
};

export default PostFinderMakeBookingEnquiry;
