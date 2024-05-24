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
  res.appendHeader('Cache-Control', 'max-age=600');
  res.appendHeader('CDN-Cache-Control', 'max-age=3000');
  res.appendHeader('Vercel-CDN-Cache-Control', 'max-age=6000');
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(ret);
};

export default GetCMAData;
