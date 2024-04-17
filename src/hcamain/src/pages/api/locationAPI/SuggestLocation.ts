import type { NextApiRequest, NextApiResponse } from 'next';
//import { SuggestLocation } from 'lib/consultant-finder/HCA';

// wrapper for integration layer location API
const SuggestLocation = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const response = { res: true };
  return res.status(200).json(response);
};

export default SuggestLocation;
