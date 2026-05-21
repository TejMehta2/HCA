import { ILogEmailFields, submitLogEmail } from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';

// wrapper for forms api call to log to an email, ability to call from the client side (internally without passing secrets)
const PostLogEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const fields: ILogEmailFields = req.body as ILogEmailFields;
  const response = await submitLogEmail(fields);
  res.setHeader('Content-Type', 'application/json');
  console.log('response from post log email:', response);
  return res.status(200).json(response);
};

export default PostLogEmail;
