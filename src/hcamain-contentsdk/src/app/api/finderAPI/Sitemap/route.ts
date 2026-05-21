import { FINDER_PROFILE_CANONICAL_BASE_URL } from 'lib/constants';
import { getActiveConsultantSlugs } from 'lib/consultant-finder/API_HCA';
import { type NextRequest } from 'next/server';

// wrapper for additional sitemap xml for CF - sitemap.hca.consultant-finder.xml
// include a reference to this in robots.txt by editing Robots list in /sitecore/content/HCA/HCA-Main/Settings
// include a redirect in the redirect map from https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml to https://www.hcahealthcare.co.uk/api/finderAPI/Sitemap
const GetFinderSitemap = async (): Promise<Response> => {
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

  return new Response(ret, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'max-age=600',
      'CDN-Cache-Control': 'max-age=1800',
      'Vercel-CDN-Cache-Control': 'max-age=3600',
    },
  });
};

export async function GET(_req: NextRequest) {
  return GetFinderSitemap();
}

export async function POST(_req: NextRequest) {
  return GetFinderSitemap();
}

export async function PUT(_req: NextRequest) {
  return GetFinderSitemap();
}

export async function PATCH(_req: NextRequest) {
  return GetFinderSitemap();
}

export async function DELETE(_req: NextRequest) {
  return GetFinderSitemap();
}

export async function HEAD(_req: NextRequest) {
  return GetFinderSitemap();
}

export async function OPTIONS(_req: NextRequest) {
  return GetFinderSitemap();
}
