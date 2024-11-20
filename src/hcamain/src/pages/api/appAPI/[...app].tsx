import { getRecurseAppItemsFromGraphQL } from 'lib/consultant-finder/getRecurseAppItemsFromGraphQL';
import { revalidate } from 'lib/consultant-finder/revalidateNow';
import type { NextApiRequest, NextApiResponse } from 'next';

// example http://localhost:3000/api/appAPI/OneApp?lang=en&platform=iOS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { app } = req.query;
  let output: unknown[] = [];
  const appRootPath = '/sitecore/content/HCA/App';
  const frags = app as string[];

  //const error: string = '';
  if (frags) {
    // path is appended to root, query params for context
    const lang = (req?.query?.lang as string) ?? 'en';
    const platform = (req?.query?.platform as string) ?? '';
    const requestedPath = `${appRootPath}/${frags.join('/')}`;
    console.log(
      'app graphQL request',
      'lang: ',
      lang,
      'platform: ',
      platform,
      'requestedPath: ',
      requestedPath
    );
    output = await getRecurseAppItemsFromGraphQL(requestedPath, lang, platform);
  }

  if (revalidate.now() || revalidate.noCache()) {
    res.appendHeader('Cache-Control', 'no-cache');
    res.appendHeader('CDN-Cache-Control', 'no-cache');
    res.appendHeader('Vercel-CDN-Cache-Control', 'no-cache');
  } else {
    res.appendHeader('Cache-Control', 'max-age=60');
    res.appendHeader('CDN-Cache-Control', 'max-age=100');
    res.appendHeader('Vercel-CDN-Cache-Control', 'max-age=120');
  }

  return res.status(200).json(output);
}
