import { parse } from 'node-html-parser';

// get all the active hca consultants on consultant finder
const consultantSlugsURL = `https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml`;
export async function getActiveConsultantSlugs(): Promise<string[]> {
  let slugs: string[] = [];
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

  return slugs;
}

// get all the active live diary consultants
const ldbConsultantSlugsURL = `https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/ldbConsultants`;
export async function getActiveLiveDiaryConsultantSlugs(): Promise<string[]> {
  let ldbSlugs: string[] = [];
  // using current/legacy live diary consultants list for now
  // replace once we have a backend that can query for a list of live diary consultant slugs
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

  return ldbSlugs;
}

// check live booking is availabe for consultant based on slug
export async function checkIfLiveBookingIsAvailable(
  slug: string
): Promise<boolean> {
  const ldbSlugs = await getActiveLiveDiaryConsultantSlugs();
  return ldbSlugs.indexOf(slug) > -1;
}

// get profile data from Doctify for consultant based on slug
const Doctify_Specialists_URL = 'https://api.doctify.com/api/hca/specialists/';
export async function getSpecialistProfileData(
  slug: string,
  serviceURL?: string
): Promise<string> {
  const requestURL = `${serviceURL ?? Doctify_Specialists_URL}${slug}`;
  let docitfyData: string = '';
  try {
    // need to cache these requests so we don't make hundreds of them
    // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
    const res = await fetch(requestURL, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      docitfyData = await res.json();
    } else {
      //docitfy call failed
      docitfyData = `{"errorCode": ${res.status}, "errorText": ${res.statusText}}`;
      console.error(
        `getSpecialistProfileData failed with error ${docitfyData}`
      );
    }
  } catch (e) {
    //docitfy call threw
    docitfyData = `{"errorCode": 999, "errorText": "An unexpected error occured fetching the profile, please retry"}`;
    console.error(`getSpecialistProfileData failed with exception ${e}`);
  }
  return docitfyData;
}

export function isErrorWithProfileData(consultantProfileJson: string): boolean {
  let isError: boolean = false;
  let consultantProfileJsonString: string = consultantProfileJson.toString();
  isError =
    consultantProfileJsonString == null ||
    consultantProfileJsonString == undefined ||
    (consultantProfileJsonString?.indexOf(`errorCode`) > 0 &&
      consultantProfileJsonString?.indexOf(`errorText`) > 0);
  return isError;
}
