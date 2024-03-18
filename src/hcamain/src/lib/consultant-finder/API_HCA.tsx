/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'node-html-parser';
import { getHCAConfig } from './getHCAConfig';

// get all the active hca consultants on consultant finder
//const consultantSlugsURL = `https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml`;

export async function getActiveConsultantSlugs(): Promise<string[]> {
  let slugs: string[] = [];
  const HCAAPIConfig = await getHCAConfig();
  const consultantSlugsURL = HCAAPIConfig?.aPI_HCA_All_Consultants_BaseURL;

  //console.log("in get active slugs", consultantSlugsURL);
  if (consultantSlugsURL && consultantSlugsURL.length > 0) {
    // using current/legacy website xml sitemap for now
    // replace once we have a backend that can query doctify for list of consultant slugs
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(consultantSlugsURL, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const consultantsXML = await res.text();
        //console.log('consultantsXML');
        /*looks like this
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mr-sam-singh</loc></url>
          <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mr-chukwuemeka-okaro</loc></url>
          <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mohamed-imam</loc></url>
        </urlset>*/
        // parse with this https://www.npmjs.com/package/node-html-parser
        const root = parse(consultantsXML);
        root.getElementsByTagName('loc').forEach((urlEle: any) => {
          const slug = urlEle.text.split('/').pop();
          slugs = slugs.concat(slug);
        });
        //console.log("CF all slugs:", slugs);
      } else {
        // couldn't get the consultant site map
        console.error(
          `Could not load consultant slugs list for pre-render from ${consultantSlugsURL}`
        );
      }
    } catch (e) {
      console.error(
        `Could not load consultant slugs list for pre-render from ${consultantSlugsURL} failed with exception ${e}`
      );
    }
  }

  return slugs;
}

// get all the active live diary consultants
//const ldbConsultantSlugsURL = `https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/ldbConsultants`;
export async function getActiveLiveDiaryConsultantSlugs(): Promise<string[]> {
  let ldbSlugs: string[] = [];
  const HCAAPIConfig = await getHCAConfig();
  const ldbConsultantSlugsURL = HCAAPIConfig?.aPI_HCA_LDB_Consultants_BaseURL;
  // using current/legacy live diary consultants list for now
  // replace once we have a backend that can query for a list of live diary consultant slugs
  if (ldbConsultantSlugsURL && ldbConsultantSlugsURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(ldbConsultantSlugsURL, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const consultantsOnLDB = await res.json();
        //console.log('consultantsOnLDB', consultantsOnLDB);
        consultantsOnLDB.forEach(
          (consultant: { UniqueKey: any; Value: string }) => {
            const slug = consultant.UniqueKey;
            if (consultant.Value === 'True') {
              ldbSlugs = ldbSlugs.concat(slug);
            }
          }
        );
        if (ldbSlugs.length == 0) {
          console.error(
            `Warning LDB consultant slugs list for is empty from call getActiveLiveDiaryConsultantSlugs`
          );
        }
        //console.log("CF LDB slugs:", ldbSlugs);
      } else {
        // couldn't get the ldb consultant slugs
        console.error(
          `Could not load LDB consultant slugs list for pre-render from ${ldbConsultantSlugsURL}`
        );
      }
    } catch (e) {
      console.error(
        `Could not load LDB consultant slugs list for pre-render from ${ldbConsultantSlugsURL} failed with exception ${e}`
      );
    }
  }

  return ldbSlugs;
}

// check live booking is availabe for consultant based on slug
export async function checkIfLiveBookingIsAvailable(
  slug: string
): Promise<boolean> {
  const ldbSlugs = await getActiveLiveDiaryConsultantSlugs();
  return ldbSlugs.indexOf(slug) > -1;
}

// check live booking is availabe for consultants based on slugs
export async function checkIfLiveBookingsIsAvailable(
  slugs: string[]
): Promise<boolean[]> {
  const ldbSlugs = await getActiveLiveDiaryConsultantSlugs();
  return slugs.map((slug: any) => ldbSlugs.indexOf(slug) > -1);
}
