/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetHCAConfig } from './getHCAConfig';
import { GetDoctifyConfig } from './getDoctifyConfig';
import { getLDBFirstAppointmentData } from './API_C2';
import { checkIfLiveBookingIsAvailable } from './API_HCA';
import { unstable_cache } from 'next/cache';
import { revalidate } from './revalidateNow';

function getMostFrequent(arr: any[]) {
  const hashmap = arr.reduce(
    (acc: { [x: string]: any }, val: string | number) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    },
    {}
  );
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

// get profile data from Doctify for consultant based on slug
//const Doctify_Specialists_URL = 'https://api.doctify.com/api/hca/specialists';
export async function getSpecialistProfileData(
  slug: string,
  serviceURL?: string,
  loadFirstAppointmentData: boolean = false
): Promise<any> {
  const config = !serviceURL ? await GetDoctifyConfig() : null;
  //console.log('config', config);
  const Doctify_Specialists_URL =
    serviceURL ?? config?.aPI_DoctifySpecialists_BaseURL;

  const requestURL = `${Doctify_Specialists_URL}/${slug}`;
  let docitfyData: any = '';
  try {
    // need to cache these requests so we don't make hundreds of them
    // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
    const res = await fetch(requestURL, {
      next: {
        revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
      },
    });
    if (res.ok) {
      docitfyData = await res.json();

      // patch in HCA facilities on doctify practice entries
      // also figure main city - could be used for nearest city functionality
      if (docitfyData) {
        let practice: any;
        const cities: string[] = [];
        for (practice in docitfyData?.practices) {
          try {
            const facilityURL = await facilityURLFromDoctifySlug(
              docitfyData?.practices[practice]?.slug
            );
            docitfyData.practices[practice]['facilityURL'] = facilityURL;
            cities.push(docitfyData.practices[practice].address?.city);
            //console.log('facilityURL', facilityURL);
          } catch (e) {
            //HCA practice call threw
            console.warn(
              `getSpecialistProfileData failed to patch in HCA facility in practice data ${e}, slug: ${docitfyData?.practices[practice]?.slug}`
            );
          }
        }
        // figure main city - default to London
        docitfyData.mainCity = 'London';
        if (cities && cities.length > 0) {
          docitfyData.mainCity = getMostFrequent(cities);
        }
        docitfyData.isLiveDiaryConsultant = false;
        try {
          const isLiveDiaryConsultant =
            await checkIfLiveBookingIsAvailable(slug);
          docitfyData.isLiveDiaryConsultant = isLiveDiaryConsultant;
        } catch (e) {
          console.warn(
            `getSpecialistProfileData failed to patch in isLiveDiaryConsultant ${e}, slug: ${slug}`
          );
        }

        // gmcNumber
        let gmcNumber = docitfyData?.registrationBodies.filter(
          (item: any) => item.name === 'General Medical Council'
        )[0]?.registrationNumber;

        // https://hcauk-digital.atlassian.net/browse/HED-1551
        // fallback if consultant is not a GMC member, but they are online consultant booking
        if (
          //docitfyData.isLiveDiaryConsultant && - HED-2174
          (!gmcNumber || gmcNumber.length === 0) &&
          docitfyData?.registrationBodies?.length > 0
        ) {
          // we pick off the first prof reg body as the identifier
          // e.g. neala-rezai - PODIATRY -
          /*
            "registrationBodies": [
            {
              "id": 5,
              "name": "Health Care and Professional Council",
              "registrationNumber": "CH33283"
            },
            {
              "id": 44,
              "name": "Royal College of Podiatry",
              "registrationNumber": "32608"
            },
            {
              "id": 166,
              "name": "HCPC - Health and care professions council",
              "registrationNumber": "CH33283"
            }
          ],*/
          // pick off CH33283 as the GMC from the first record
          gmcNumber = docitfyData?.registrationBodies[0]?.registrationNumber;
        }

        docitfyData.gmcNumber = gmcNumber;
        if (loadFirstAppointmentData && docitfyData.isLiveDiaryConsultant) {
          try {
            const res = await getLDBFirstAppointmentData(gmcNumber); // e.g. "4113571"
            docitfyData.firstAppointment = res;
            //console.log("first apt:", res);
          } catch (e) {
            //first appointment call threw
            console.warn(
              `getSpecialistProfileData failed to patch in first appointment ${e}, slug: ${slug}`
            );
          }
        }

        // custom fields
        if (docitfyData.customFields) {
          if (docitfyData.customFields.cmaHtml) {
            const hcaConfig = await GetHCAConfig();
            // are we going to change the CMA link to use the Doctify CMA profile (aPI_HCA_CMAs_UseDoctifyData)
            // or keep the legacy Sitecore GUID url?
            // legacy  requires CMA look up stored in Excel in the Media library
            if (hcaConfig.aPI_HCA_CMAs_UseDoctifyData) {
              const replaceCMA = `/finder/CMADisclosures/${slug}?CmaContentId=`;
              if (docitfyData.about) {
                docitfyData.about = (docitfyData.about as string).replace(
                  `https://www.hcahealthcare.co.uk/`,
                  'https:/'
                );
                // insert the slug as a frag in the CMA link - NextJS style
                docitfyData.about = (docitfyData.about as string).replace(
                  '/cma-disclosure?CmaContentId=',
                  replaceCMA
                );
              }
              // second about field in the Doctify data
              if (docitfyData.customFields.about) {
                docitfyData.about = (docitfyData.about as string).replace(
                  `https://www.hcahealthcare.co.uk/`,
                  'https:/'
                );
                // insert the slug as a frag in the CMA link - NextJS style
                docitfyData.customFields.about = (
                  docitfyData.customFields.about as string
                ).replace('/cma-disclosure?CmaContentId=', replaceCMA);
              }
            }
          }
        }
      }
    } else {
      //docitfy call failed
      docitfyData = `{"errorCode": ${res.status}, "errorText": ${res.statusText}}`;
      console.warn(
        `getSpecialistProfileData failed to retrieve Doctify slug:${slug} with error:${docitfyData}`
      );
    }
  } catch (e) {
    //docitfy call threw
    docitfyData = `{"errorCode": 999, "errorText": "An unexpected error occured fetching the getSpecialistProfileData, please retry"}`;
    console.warn(`getSpecialistProfileData failed with exception ${e}`);
  }
  return docitfyData;
}

export function isErrorWithProfileData(consultantProfileJson: string): boolean {
  let isError: boolean = false;
  const consultantProfileJsonString: string = consultantProfileJson.toString();
  isError =
    consultantProfileJsonString == null ||
    consultantProfileJsonString == undefined ||
    (consultantProfileJsonString?.indexOf(`errorCode`) > 0 &&
      consultantProfileJsonString?.indexOf(`errorText`) > 0);
  return isError;
}

export async function getFacilitiesData(): Promise<any> {
  // revalidateTag('cacheGetFacilitiesData'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await __getFacilitiesData();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetFacilitiesData cache revalidate flag:${revalidate.now()}`
    );
    return await _getNCFacilitiesData();
  } else {
    return await _getFacilitiesData();
  }
}

// front our fairly expensive server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _getFacilitiesData = unstable_cache(
  async (): Promise<any> => {
    console.log('refreshing _getFacilitiesData from source..');
    const ret = await __getFacilitiesData();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getFacilitiesData`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetFacilitiesData'],
    revalidate: 3600,
  }
);

const _getNCFacilitiesData = unstable_cache(
  async (): Promise<any> => {
    console.log('refreshing _getFacilitiesData from source..');
    const ret = await __getFacilitiesData();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getNCFacilitiesData`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetFacilitiesData'],
    revalidate: 1,
  }
);
// get HCA facilities data
//const Doctify_To_HCA_Facilities_URL = `https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/doctifyFacilities`;
async function __getFacilitiesData(serviceURL?: string): Promise<any> {
  const HCAAPIConfig = !serviceURL ? await GetHCAConfig() : null;

  const facilitiesURL = HCAAPIConfig?.aPI_HCA_DoctifyToFacilities_UtilizesLegacy
    ? HCAAPIConfig?.aPI_HCA_DoctifyToFacilities_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_DoctifyToFacilities_BaseURL;
  const requestURL = `${serviceURL ?? facilitiesURL}`;

  let facilitiesData: any = '';
  try {
    // need to cache these requests so we don't make hundreds of them
    // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
    const res = await fetch(requestURL, {
      next: {
        revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
      },
    });

    if (res.ok) {
      facilitiesData = await res.json();
    } else {
      //docitfy call failed
      facilitiesData = `{"errorCode": ${res.status}, "errorText": ${res.statusText}}`;
      console.warn(`getFacilitiesData failed with error ${facilitiesData}`);
    }
  } catch (e) {
    //docitfy call threw
    facilitiesData = `{"errorCode": 999, "errorText": "An unexpected error occured fetching getFacilitiesData, please retry"}`;
    console.warn(`getFacilitiesData failed with exception ${e}`);
  }

  return facilitiesData;
}

// get the HCA facility url from the Doctify practice slug
export async function facilityURLFromDoctifySlug(
  doctifyLocationSlug: string
): Promise<string> {
  let locationURL: string = '';
  const facilities = await getFacilitiesData();

  if (facilities?.findIndex) {
    // got something usable back
    const index = facilities.findIndex(
      (facility: any) => facility.UniqueKey === doctifyLocationSlug
    );
    if (index > -1) {
      locationURL = facilities[index]?.Values?.fullURL; //"https://www.hcahealthcare.co.uk/facilities/the-harborne-hospital";
    }
  }

  return locationURL;
}

// get insurance data from Doctify
//const Doctify_Specialists_URL = 'https://api.doctify.com/api/hca/specialists';
export async function getInsuranceData(serviceURL?: string): Promise<any> {
  const config = !serviceURL ? await GetDoctifyConfig() : null;
  //console.log(DoctifyConfig);
  const Doctify_Insurance_URL = serviceURL ?? config?.aPI_Insurance_BaseURL;

  const requestURL = `${Doctify_Insurance_URL}`;
  let docitfyData: any = '';
  try {
    // need to cache these requests so we don't make hundreds of them
    // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
    const res = await fetch(requestURL, {
      next: {
        revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
      },
    });
    if (res.ok) {
      docitfyData = await res.json();
    } else {
      //docitfy call failed
      docitfyData = `{"errorCode": ${res.status}, "errorText": ${res.statusText}}`;
      console.warn(
        `getInsuranceData failed to retrieve Doctify insurance data with error:${docitfyData}`
      );
    }
  } catch (e) {
    //docitfy call threw
    docitfyData = `{"errorCode": 999, "errorText": "An unexpected error occured fetching the getInsuranceData, please retry"}`;
    console.warn(`getInsuranceData failed with exception ${e}`);
  }
  return docitfyData;
}

export interface IDoctifyConsultantRecord {
  slug: string;
  title: string;
  firstName: string;
  lastName: string;
  suffix: string;
  proId: string;
  proIdType: string;
  isGP: boolean;
}

export async function doctifyGetAllConsultantSlugs(): Promise<
  IDoctifyConsultantRecord[]
> {
  const doctifyConfig = await GetDoctifyConfig();
  const baseURL =
    doctifyConfig?.aPI_DoctifySearch_BaseURL ||
    'https://api.doctify.com/api/hca/search';
  let consIdx = 0;
  let maxConsultants = 5000;
  const pageSize = 150;
  let stop = false;
  let recs: IDoctifyConsultantRecord[] = [];

  for (consIdx = 0; consIdx < maxConsultants && !stop; ) {
    const consultantProfilesURL = `${baseURL}?sortType=relevance&distance=0&lat=51.5073509&lon=-0.1277583&limit=${pageSize}&offset=${consIdx}`;
    //console.log('link:' + consultantProfilesURL);
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(consultantProfilesURL, {
        next: {
          revalidate: revalidate.now() || revalidate.noCache() ? false : 120,
        },
      });
      if (res.ok) {
        const consultantJSON = await res.json();
        maxConsultants = consultantJSON.total;
        consultantJSON.rows.forEach((entry: any) => {
          // gmcNumber/professional id
          let proId = entry?.registrationBodies.filter(
            (item: any) => item.name === 'General Medical Council'
          )[0]?.registrationNumber;

          let proIdType = 'General Medical Council';
          // https://hcauk-digital.atlassian.net/browse/HED-1551
          // fallback if consultant is not a GMC member, but they are online consultant booking
          if (
            (!proId || proId.length === 0) &&
            entry?.registrationBodies?.length > 0
          ) {
            // we pick off the first prof reg body as the identifier
            proId = entry?.registrationBodies[0]?.registrationNumber;
            proIdType = entry?.registrationBodies[0]?.name;
          }

          const topSpecialty = entry?.keywords?.filter(
            (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
          );
          const isGP = topSpecialty?.name === 'General Practice (GP)';

          const record: IDoctifyConsultantRecord = {
            slug: entry.slug,
            title: entry.title,
            firstName: entry.firstName,
            lastName: entry.lastName,
            suffix: entry.suffix,
            proId: proId,
            proIdType: proIdType,
            isGP: isGP,
          };
          recs = recs.concat(record);
        });
        consIdx += consultantJSON.rows.length;
      } else {
        stop = true;
        console.log('end of Doctify scan: ', JSON.stringify(res));
      }
    } catch (e) {
      console.warn(
        `Could not load consultant profiles list for pre-render from ${consultantProfilesURL} failed with exception ${e}`
      );
      recs = [];
      stop = true;
      break;
    }
  }

  return recs;
}
