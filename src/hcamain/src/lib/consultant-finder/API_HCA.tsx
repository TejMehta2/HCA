/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'node-html-parser';
import { getHCAConfig } from './getHCAConfig';
import { getDoctifyConfig } from './getDoctifyConfig';

export async function doctifyGetAllConsultantSlugs(): Promise<string[]> {
  const doctifyConfig = await getDoctifyConfig();
  const baseURL =
    doctifyConfig?.aPI_DoctifySearch_BaseURL ||
    'https://api.doctify.com/api/hca/search';
  let consIdx = 0;
  let maxConsultants = 5000;
  const pageSize = 100;
  const stop = false;
  let slugs: string[] = [];

  for (consIdx = 0; consIdx < maxConsultants && !stop; consIdx += pageSize) {
    const consultantProfilesURL = `${baseURL}?sortType=nearest&distance=1000&lat=51.5073509&lon=-0.1277583&limit=${pageSize}&offset=${consIdx}`;
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(consultantProfilesURL, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const consultantJSON = await res.json();
        maxConsultants = consultantJSON.total;
        consultantJSON.rows.forEach((entry: any) => {
          slugs = slugs.concat(entry.slug);
        });
      }
    } catch (e) {
      console.warn(
        `Could not load consultant profiles list for pre-render from ${consultantProfilesURL} failed with exception ${e}`
      );
    }
  }

  return slugs;
}

// get all the active hca consultants on consultant finder
//const consultantSlugsURL = `https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml`;

export async function getActiveConsultantSlugs(): Promise<string[]> {
  let slugs: string[] = [];
  const HCAAPIConfig = await getHCAConfig();

  if (HCAAPIConfig.aPI_HCA_All_Consultants_UtilizesLegacy) {
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
          console.warn(
            `Could not load consultant slugs list for pre-render from ${consultantSlugsURL}`
          );
        }
      } catch (e) {
        console.warn(
          `Could not load consultant slugs list for pre-render from ${consultantSlugsURL} failed with exception ${e}`
        );
      }
    }
  } else {
    slugs = await doctifyGetAllConsultantSlugs();
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
          console.warn(
            `Warning LDB consultant slugs list for is empty from call getActiveLiveDiaryConsultantSlugs`
          );
        }
        //console.log("CF LDB slugs:", ldbSlugs);
      } else {
        // couldn't get the ldb consultant slugs
        console.warn(
          `Could not load LDB consultant slugs list for pre-render from ${ldbConsultantSlugsURL}`
        );
      }
    } catch (e) {
      console.warn(
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

// get all the holidays
// e.g. https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/holidays
export async function getHolidays(): Promise<string[]> {
  let holidays;
  const HCAAPIConfig = await getHCAConfig();
  const holidayURL = HCAAPIConfig?.aPI_HCA_Holidays_BaseURL;
  //console.log('holiday url', holidayURL);
  //console.log('config', HCAAPIConfig);
  if (holidayURL && holidayURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(holidayURL, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        holidays = await res.json();
        if (holidays.length == 0) {
          console.warn(`Warning Holidays empty on getHolidays() call`);
        }
      } else {
        // couldn't get the holidays
        console.warn(
          `Could not load holidays list for pre-render from ${holidayURL}`
        );
      }
    } catch (e) {
      console.warn(
        `Could not load holidays for pre-render from ${holidayURL} failed with exception ${e}`
      );
    }
  }

  return holidays;
}

// get all the CMAs
// e.g. /api/lookupAPI/finder/default/findbydictionary/CMA
export async function getCMAs(): Promise<string[]> {
  let cmas;
  const HCAAPIConfig = await getHCAConfig();
  const cmaURL = HCAAPIConfig?.aPI_HCA_CMAs_BaseURL;

  //console.log('config', HCAAPIConfig);
  console.log('cmaURL', cmaURL);
  if (cmaURL && cmaURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(cmaURL, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        cmas = await res.json();
        if (cmas.length == 0) {
          console.warn(`Warning CMAs empty on getCMAs() call`);
        }
      } else {
        // couldn't get the cmas
        console.warn(
          `Could not load CMAs list for pre-render from ${cmaURL} result:${res}`
        );
      }
    } catch (e) {
      console.warn(
        `Could not load CMAs for pre-render from ${cmaURL} failed with exception ${e}`
      );
    }
  }

  return cmas;
}
