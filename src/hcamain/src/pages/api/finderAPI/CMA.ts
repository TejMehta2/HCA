import { getCMA } from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';

// wrapper for CMA profile query
const GetCMAData = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { cmaId: cmaId },
  } = req;
  //console.log('cmaId', cmaId);
  const ret = await getCMA(cmaId as string);
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(ret);
};

export default GetCMAData;
