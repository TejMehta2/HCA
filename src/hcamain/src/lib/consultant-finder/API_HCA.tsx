/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'node-html-parser';
import { getHCAConfig } from './getHCAConfig';
import { getDoctifyConfig } from './getDoctifyConfig';
import { getSpecialistProfileData } from './API_Doctify';

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
export async function getCMAs(): Promise<any[]> {
  let cmas;
  const HCAAPIConfig = await getHCAConfig();
  const cmaURL = HCAAPIConfig?.aPI_HCA_CMAs_BaseURL;

  //console.log('config', HCAAPIConfig);
  //console.log('cmaURL', cmaURL);
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

// get single CMA
// e.g. /api/lookupAPI/finder/default/findbydictionary/CMA?key=5251DC52-E57D-47EA-8552-98BFEFF89E72
export async function getCMA(id: string): Promise<any> {
  let cma;
  const HCAAPIConfig = await getHCAConfig();

  if (
    HCAAPIConfig?.aPI_HCA_CMAs_BaseURL &&
    HCAAPIConfig.aPI_HCA_CMAs_BaseURL.length > 0
  ) {
    const cmaURL = `${HCAAPIConfig.aPI_HCA_CMAs_BaseURL}?key=${id}`;

    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(cmaURL, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        cma = await res.json();
        if (cma && cma.length > 0) {
          // returned stuff from the server side
          return cma[0];
        }
        if (cma.length == 0) {
          console.warn(`Warning CMA empty on getCMA() call`);
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

  return cma;
}

// get structured data for the given slug
//
export async function getPhysicianStructuredData(slug: string): Promise<any> {
  const specialistProfileData = await getSpecialistProfileData(slug);
  let ret: any = null;

  if (specialistProfileData && specialistProfileData.slug) {
    try {
      ret = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        mainEntity: {
          '@context': 'https://schema.org',
          '@type': 'Physician',
          name: '',
          description: '',
          url: '',
          address: {
            '@type': 'PostalAddress',
            addressLocality: '',
            addressRegion: '',
            postalCode: '',
            streetAddress: '',
          },
          telephone: '',
          image: '',
          medicalSpecialty: {
            '@type': 'MedicalSpecialty',
            name: '',
            url: '',
          },
          hasCredential: [
            {
              '@type': 'EducationalOccupationalCredential',
              id: '',
              name: '',
            },
            {
              '@type': 'EducationalOccupationalCredential',
              id: '',
              name: '',
            },
          ],
          award: [],
          hospitalAffiliation: [],
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': 'https://www.hcahealthcare.co.uk',
                name: 'Home',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': 'https://www.hcahealthcare.co.uk/Finder',
                name: 'Finder',
              },
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@id':
                  'https://www.hcahealthcare.co.uk/Finder/StepConsultantProfile',
                name: 'StepConsultantProfile',
              },
            },
            {
              '@type': 'ListItem',
              position: 4,
              item: {
                '@id': `https://www.hcahealthcare.co.uk/Finder/StepConsultantProfile/${specialistProfileData.slug}`,
                name: `${specialistProfileData.title} ${specialistProfileData.firstName} ${specialistProfileData.lastName} ${specialistProfileData.suffix}`,
              },
            },
          ],
        },
      };

      //console.log('in specialistProfileData');
      // top specialty
      const topSpecialty = specialistProfileData?.keywords?.filter(
        (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
      );
      // locations
      const locations = specialistProfileData?.practices;
      ret.mainEntity.name = `${specialistProfileData.title} ${specialistProfileData.firstName} ${specialistProfileData.lastName}`;
      ret.mainEntity.description = `${specialistProfileData.about}`;
      ret.mainEntity.url = `https://www.hcahealthcare.co.uk/Finder/StepConsultantProfile/${specialistProfileData.slug}`;
      //TODO get from content
      ret.mainEntity.address.addressLocality = 'London';
      ret.mainEntity.address.addressRegion = 'London';
      ret.mainEntity.address.postalCode = 'W1G 0PU';
      ret.mainEntity.address.streetAddress =
        'HCA Healthcare, 2 Cavendish Square';
      ret.mainEntity.telephone = '+442045711724';
      ret.mainEntity.image = specialistProfileData.images?.logo ?? '';
      ret.mainEntity.medicalSpecialty.name = topSpecialty
        ? topSpecialty[0].name
        : 'MD';
      ret.mainEntity.medicalSpecialty.url = `https://www.hcahealthcare.co.uk/search-results?query=${ret.mainEntity.medicalSpecialty.name}`;
      ret.mainEntity.hasCredential[0].name = `${specialistProfileData.suffix}`;
      ret.mainEntity.hasCredential[0].id = `https://www.hcahealthcare.co.uk/Finder/StepConsultantProfile/${specialistProfileData.slug}#Bio`;
      ret.mainEntity.hasCredential[1].name = `GMC Registration: ${specialistProfileData.gmcNumber}`;
      ret.mainEntity.hasCredential[1].id = `https://www.gmc-uk.org/doctors/${specialistProfileData.gmcNumber}`;
      locations?.forEach((loc: any, idx: number) => {
        ret.mainEntity.hospitalAffiliation[idx] = {
          '@type': 'Hospital',
          name: loc.name,
          address: `${loc.address?.street1},${loc.address?.street2},${loc.address?.city},${loc.address?.county},${loc.address?.postcode},${loc.address?.country}`,
          telephone: `${loc.phone}`,
          image: `${loc.images?.logo}`,
        };
      });
    } catch (e) {
      console.warn(
        `Could not load PhysicianStructuredData failed with exception ${e}`
      );
    }
  }

  return ret;
}
