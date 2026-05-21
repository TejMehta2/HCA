import { FINDER_PROFILE_CANONICAL_BASE_URL } from 'lib/constants';
import { getActiveConsultantSlugs } from 'lib/consultant-finder/API_HCA';
import type { NextApiRequest, NextApiResponse } from 'next';

// wrapper for additional sitemap xml for CF - sitemap.hca.consultant-finder.xml
// include a reference to this in robots.txt by editing Robots list in /sitecore/content/HCA/HCA-Main/Settings
// include a redirect in the redirect map from https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml to https://www.hcahealthcare.co.uk/api/finderAPI/Sitemap
const GetFinderSitemap = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const slugs = await getActiveConsultantSlugs();

  /*should look a bit like this
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mr-sam-singh</loc></url>
    <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mr-chukwuemeka-okaro</loc></url>
    <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mohamed-imam</loc></url>
    </urlset>*/

  let ret = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  slugs.map((slug) => {
    ret += `
    <url>
        <loc>${FINDER_PROFILE_CANONICAL_BASE_URL}/${slug}</loc>
    </url>`;
  });
  ret += `
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'max-age=600');
  res.setHeader('CDN-Cache-Control', 'max-age=1800');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  return res.status(200).send(ret);
};

export default GetFinderSitemap;
