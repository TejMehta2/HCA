/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from 'next/cache';
import { parse } from 'node-html-parser';
import { GetHCAConfig } from './getHCAConfig';
import {
  getSpecialistProfileData,
  doctifyGetAllConsultantSlugs,
} from './API_Doctify';
import { revalidate } from './revalidateNow';
import { BASE_URL } from 'lib/constants';

export interface IConsultantRecord {
  slug: string;
  title: string;
  firstName: string;
  lastName: string;
  suffix: string;
  proId: string;
  proIdType: string;
  mnemonicMT: string;
  refreshDate: Date;
  live: boolean;
  liveStatus: string;
  liveOnProd: boolean;
  liveOnUAT: boolean;
  noReview: boolean;
  isGP: boolean;
  doctifyPhone: boolean;
}

/******All consultants********/
export async function getActiveConsultantSlugs(): Promise<string[]> {
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await __getActiveConsultantSlugs();
  } else if (revalidate.now()) {
    // revalidateTag('cacheGetActiveConsultantSlugs'); should work - but throws - as requires Next 14 / use server
    // workaround for clearing the cache
    console.log(
      `purging cacheGetActiveConsultantSlugs cache revalidate flag:${revalidate.now()}`
    );
    return await _getNCActiveConsultantSlugs();
  } else {
    return await _getActiveConsultantSlugs();
  }
}

const _getActiveConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    console.log('refreshing _getActiveConsultantSlugs from source..');
    const ret = await __getActiveConsultantSlugs();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getActiveConsultantSlugs`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetActiveConsultantSlugs'],
    revalidate: 3600,
  }
);

// front our fairly expensive server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _getNCActiveConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    console.log('refreshing _getActiveConsultantSlugs from source..');
    const ret = await __getActiveConsultantSlugs();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getNCActiveConsultantSlugs`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetActiveConsultantSlugs'],
    revalidate: 1,
  }
);

// get all the active hca consultants on consultant finder
//const consultantSlugsURL = `https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml`;
async function __getActiveConsultantSlugs(): Promise<string[]> {
  let slugs: string[] = [];
  const HCAAPIConfig = await GetHCAConfig();

  if (HCAAPIConfig.aPI_HCA_All_Consultants_UtilizesLegacy) {
    const consultantSlugsURL =
      HCAAPIConfig?.aPI_HCA_All_Consultants_LegacyBaseURL;

    //console.log("in get active slugs", consultantSlugsURL);
    if (consultantSlugsURL && consultantSlugsURL.length > 0) {
      // using current/legacy website xml sitemap for now
      // replace once we have a backend that can query doctify for list of consultant slugs
      try {
        // need to cache these requests so we don't make hundreds of them
        // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
        const res = await fetch(consultantSlugsURL, {
          next: {
            revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
          },
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
    const recs = await doctifyGetAllConsultantSlugs();
    slugs = recs?.map(({ slug }) => slug);
  }

  return slugs;
}

/******OCB / live diaries********/
export async function getActiveLiveDiaryConsultantSlugs(): Promise<string[]> {
  // revalidateTag('cacheGetActiveLiveDiaryConsultantSlugs'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await __getActiveLiveDiaryConsultantSlugs();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetActiveLiveDiaryConsultantSlugs cache revalidate flag:${revalidate.now()}`
    );
    return await _getNCActiveLiveDiaryConsultantSlugs();
  } else {
    return await _getActiveLiveDiaryConsultantSlugs();
  }
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _getActiveLiveDiaryConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    console.log('refreshing _getActiveLiveDiaryConsultantSlugs from source..');
    const ret = await __getActiveLiveDiaryConsultantSlugs();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getActiveLiveDiaryConsultantSlugs`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetActiveLiveDiaryConsultantSlugs'],
    revalidate: 3600,
  }
);

const _getNCActiveLiveDiaryConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const ret = await __getActiveLiveDiaryConsultantSlugs();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getNCActiveLiveDiaryConsultantSlugs`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetActiveLiveDiaryConsultantSlugs'],
    revalidate: 1,
  }
);

// get all the active live diary consultants
async function __getActiveLiveDiaryConsultantSlugs(): Promise<string[]> {
  let ldbSlugs: string[] = [];
  const HCAAPIConfig = await GetHCAConfig();
  const ldbConsultantSlugsURL =
    HCAAPIConfig?.aPI_HCA_LDB_Consultants_UtilizesLegacy
      ? HCAAPIConfig?.aPI_HCA_LDB_Consultants_LegacyBaseURL
      : HCAAPIConfig?.aPI_HCA_LDB_Consultants_BaseURL;

  if (ldbConsultantSlugsURL && ldbConsultantSlugsURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(ldbConsultantSlugsURL, {
        next: {
          revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
        },
      });
      if (res.ok) {
        const consultantsOnLDB = await res.json();
        //console.log('consultantsOnLDB', consultantsOnLDB);
        consultantsOnLDB.forEach(
          (consultant: { UniqueKey: any; Value: string | boolean }) => {
            const slug = consultant.UniqueKey;
            if (consultant.Value === 'True' || consultant.Value === true) {
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

/******Reviews********/
export async function getIgnoreReviewsConsultantSlugs(): Promise<string[]> {
  // revalidateTag('cacheGetIgnoreReviewsConsultantSlugs'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await __getIgnoreReviewsConsultantSlugs();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetIgnoreReviewsConsultantSlugs cache revalidate flag:${revalidate.now()}`
    );
    return await _getNCIgnoreReviewsConsultantSlugs();
  } else {
    return await _getIgnoreReviewsConsultantSlugs();
  }
}

// get all the ignore reviews consultants
async function __getIgnoreReviewsConsultantSlugs(): Promise<string[]> {
  let noReviewSlugs: string[] = [];
  const HCAAPIConfig = await GetHCAConfig();
  const ldbConsultantSlugsURL =
    HCAAPIConfig?.aPI_HCA_LDB_Consultants_UtilizesLegacy
      ? HCAAPIConfig?.aPI_HCA_LDB_Consultants_LegacyBaseURL
      : HCAAPIConfig?.aPI_HCA_LDB_Consultants_BaseURL;

  if (ldbConsultantSlugsURL && ldbConsultantSlugsURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(ldbConsultantSlugsURL, {
        next: {
          revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
        },
      });
      if (res.ok) {
        const consultantsOnLDB = await res.json();
        //console.log('consultantsOnLDB', consultantsOnLDB);
        consultantsOnLDB.forEach(
          (consultant: {
            Values: any;
            UniqueKey: any;
            NoReview: string | boolean;
          }) => {
            const slug = consultant.UniqueKey;
            if (
              consultant.Values?.NoReview === 'True' ||
              consultant.Values?.NoReview === true
            ) {
              noReviewSlugs = noReviewSlugs.concat(slug);
            }
          }
        );
        if (noReviewSlugs.length == 0) {
          console.warn(
            `Warning consultant slugs list for is empty from call __getIgnoreReviewsConsultantSlugs`
          );
        }
      } else {
        // couldn't get the ldb consultant slugs
        console.warn(
          `Could not load consultant slugs list for pre-render from ${ldbConsultantSlugsURL}`
        );
      }
    } catch (e) {
      console.warn(
        `Could not load consultant slugs list for pre-render from ${ldbConsultantSlugsURL} failed with exception ${e}`
      );
    }
  }
  //console.log('noReviewSlugs:', noReviewSlugs);
  return noReviewSlugs;
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _getIgnoreReviewsConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    console.log('refreshing _getIgnoreReviewsConsultantSlugs from source..');
    const ret = await __getIgnoreReviewsConsultantSlugs();
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetIgnoreReviewsConsultantSlugs'],
    revalidate: 3600,
  }
);

const _getNCIgnoreReviewsConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const ret = await __getIgnoreReviewsConsultantSlugs();
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetIgnoreReviewsConsultantSlugs'],
    revalidate: 1,
  }
);

// check live booking is availabe for consultant based on slug
export async function checkIfConsultantIsNoReviews(
  slug: string
): Promise<boolean> {
  const ldbSlugs = await getIgnoreReviewsConsultantSlugs();
  return ldbSlugs.indexOf(slug) > -1;
}

/******DoctifyPhoneNumbers********/
//TODO Refactor these calls use single data source
export async function getDoctifyPhoneNumberConsultantSlugs(): Promise<
  string[]
> {
  // revalidateTag('cacheGetDoctifyPhoneNumberConsultantSlugs'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await __getDoctifyPhoneNumberConsultantSlugs();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetDoctifyPhoneNumberConsultantSlugs cache revalidate flag:${revalidate.now()}`
    );
    return await _getNCDoctifyPhoneNumberConsultantSlugs();
  } else {
    return await _getDoctifyPhoneNumberConsultantSlugs();
  }
}

// get all the ignore reviews consultants
async function __getDoctifyPhoneNumberConsultantSlugs(): Promise<string[]> {
  let doctifyPhoneNumberSlugs: string[] = [];
  const HCAAPIConfig = await GetHCAConfig();
  const ldbConsultantSlugsURL =
    HCAAPIConfig?.aPI_HCA_LDB_Consultants_UtilizesLegacy
      ? HCAAPIConfig?.aPI_HCA_LDB_Consultants_LegacyBaseURL
      : HCAAPIConfig?.aPI_HCA_LDB_Consultants_BaseURL;

  if (ldbConsultantSlugsURL && ldbConsultantSlugsURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(ldbConsultantSlugsURL, {
        next: {
          revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
        },
      });
      if (res.ok) {
        const consultantsOnLDB = await res.json();
        //console.log('consultantsOnLDB', consultantsOnLDB);
        consultantsOnLDB.forEach(
          (consultant: {
            Values: any;
            UniqueKey: any;
            NoDoctifyPhoneNumber: string | boolean;
          }) => {
            const slug = consultant.UniqueKey;
            if (
              consultant.Values?.DoctifyPhone === 'True' ||
              consultant.Values?.DoctifyPhone === true
            ) {
              doctifyPhoneNumberSlugs = doctifyPhoneNumberSlugs.concat(slug);
            }
          }
        );
        if (doctifyPhoneNumberSlugs.length == 0) {
          console.warn(
            `Warning consultant slugs list for is empty from call __getDoctifyPhoneNumberConsultantSlugs`
          );
        }
      } else {
        // couldn't get the ldb consultant slugs
        console.warn(
          `Could not load consultant slugs list for pre-render from ${ldbConsultantSlugsURL}`
        );
      }
    } catch (e) {
      console.warn(
        `Could not load consultant slugs list for pre-render from ${ldbConsultantSlugsURL} failed with exception ${e}`
      );
    }
  }
  //console.log('doctifyPhoneNumberSlugs:', doctifyPhoneNumberSlugs);
  return doctifyPhoneNumberSlugs;
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _getDoctifyPhoneNumberConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    console.log(
      'refreshing _getDoctifyPhoneNumberConsultantSlugs from source..'
    );
    const ret = await __getDoctifyPhoneNumberConsultantSlugs();
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetDoctifyPhoneNumberConsultantSlugs'],
    revalidate: 3600,
  }
);

const _getNCDoctifyPhoneNumberConsultantSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const ret = await __getDoctifyPhoneNumberConsultantSlugs();
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetDoctifyPhoneNumberConsultantSlugs'],
    revalidate: 1,
  }
);

// check live booking is availabe for consultant based on slug
export async function checkIfConsultantIsDoctifyPhoneNumber(
  slug: string
): Promise<boolean> {
  const ldbSlugs = await getDoctifyPhoneNumberConsultantSlugs();
  return ldbSlugs.indexOf(slug) > -1;
}

/******Holidays********/
export async function getHolidays(): Promise<string[]> {
  // revalidateTag('cacheGetHolidays'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await __getHolidays();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetHolidays cache revalidate flag:${revalidate.now()}`
    );
    return await _getNCHolidays();
  } else {
    return await _getHolidays();
  }
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _getHolidays = unstable_cache(
  async (): Promise<string[]> => {
    console.log('refreshing _getHolidays from source..');
    const ret = await __getHolidays();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getHolidays`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetHolidays'],
    revalidate: 3600,
  }
);

const _getNCHolidays = unstable_cache(
  async (): Promise<string[]> => {
    console.log('refreshing _getHolidays from source..');
    const ret = await __getHolidays();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getNCHolidays`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetHolidays'],
    revalidate: 1,
  }
);

// get all the holidays
// e.g. https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/holidays
async function __getHolidays(): Promise<string[]> {
  let holidays;
  const HCAAPIConfig = await GetHCAConfig();
  const holidayURL = HCAAPIConfig?.aPI_HCA_Holidays_UtilizesLegacy
    ? HCAAPIConfig?.aPI_HCA_Holidays_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_Holidays_BaseURL;
  //console.log('holiday url', holidayURL);
  //console.log('config', HCAAPIConfig);
  if (holidayURL && holidayURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(holidayURL, {
        next: {
          revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
        },
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

export async function getCMAs(): Promise<any[]> {
  // revalidateTag('cacheGetCMAs'); should work - but throws - as requires Next 14 / use server
  // workaround for clearing the cache
  if (revalidate.noCache()) {
    // unstable_cache not supported from getStaticPaths
    return await __getCMAs();
  } else if (revalidate.now()) {
    console.log(
      `purging cacheGetCMAs cache revalidate flag:${revalidate.now()}`
    );
    return await _getNCCMAs();
  } else {
    return await _getCMAs();
  }
}

// front our fairly expensive and frequently called server-side API call with the unstable cache
// as the Next fetch API cache only works with the React graph and we are not within that at this point
// based on https://blog.logrocket.com/caching-next-js-unstable-cache/
const _getCMAs = unstable_cache(
  async (): Promise<any[]> => {
    console.log('refreshing _getCMAs from source..');
    const ret = await __getCMAs();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getCMAs`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetCMAs'],
    revalidate: 3600,
  }
);

// this has the same effect as revalidateTag('cacheGetCMAs');
// which should work - but throws - as requires Next 14 / use server
const _getNCCMAs = unstable_cache(
  async (): Promise<any[]> => {
    console.log('refreshing _getCMAs from source..');
    const ret = await __getCMAs();
    // test possible return and throw to avoid caching bad results!
    if (ret.length == 0) {
      throw new Error(
        `Error attempting to cache data, zero records or invalid data in _getNCCMAs`
      );
    }
    return ret;
  },
  undefined,
  {
    tags: ['cacheGetCMAs'],
    revalidate: 1,
  }
);

// get all the CMAs
// e.g. /api/lookupAPI/finder/default/findbydictionary/CMA
async function __getCMAs(): Promise<any[]> {
  let cmas;
  const HCAAPIConfig = await GetHCAConfig();
  const cmaURL = HCAAPIConfig?.aPI_HCA_CMAs_BaseURL;

  //console.log('config', HCAAPIConfig);
  //console.log('cmaURL', cmaURL);
  if (cmaURL && cmaURL.length > 0) {
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(cmaURL, {
        next: {
          revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
        },
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
  const HCAAPIConfig = await GetHCAConfig();

  if (
    HCAAPIConfig?.aPI_HCA_CMAs_BaseURL &&
    HCAAPIConfig.aPI_HCA_CMAs_BaseURL.length > 0
  ) {
    const cmaURL = `${HCAAPIConfig.aPI_HCA_CMAs_BaseURL}?key=${id}`;

    //console.log('cmaURL', cmaURL);
    try {
      // need to cache these requests so we don't make hundreds of them
      // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
      const res = await fetch(cmaURL, {
        next: {
          revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
        },
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
export async function getPhysicianStructuredData(
  slug: string,
  specialistProfileData?: any, // can be passed in to save a second call
  path?: string,
  site: string = `${BASE_URL}`
): Promise<any> {
  if (!specialistProfileData) {
    specialistProfileData = await getSpecialistProfileData(slug);
  }
  let ret: any = null;

  // build the breadcrumbs dynamically
  const pathSegments = path?.split('/', 10);
  const breadcrumbList: any[] = [];
  breadcrumbList.push({
    '@type': 'ListItem',
    position: 1,
    item: {
      '@id': `${site}`,
      name: `Home`,
    },
  });

  let segmentTracker = site;
  pathSegments?.forEach((segment, idx) => {
    segmentTracker += '/' + segment;
    switch (idx) {
      case pathSegments.length - 1:
        {
          breadcrumbList.push({
            '@type': 'ListItem',
            position: `${idx + 2}`,
            item: {
              '@id': `${segmentTracker}${specialistProfileData.slug}`,
              name: `${specialistProfileData.title} ${specialistProfileData.firstName} ${specialistProfileData.lastName} ${specialistProfileData.suffix}`,
            },
          });
        }
        break;
      default:
        {
          breadcrumbList.push({
            '@type': 'ListItem',
            position: `${idx + 2}`,
            item: {
              '@id': `${segmentTracker}`,
              name: `${segment}`,
            },
          });
        }
        break;
    }
  });

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
          itemListElement: breadcrumbList,
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
      ret.mainEntity.url = `${segmentTracker}${specialistProfileData.slug}`;

      const HCAAPIConfig = await GetHCAConfig();
      ret.mainEntity.address.addressLocality = HCAAPIConfig?.hQAddressLocality;
      ret.mainEntity.address.addressRegion = HCAAPIConfig?.hQAddressRegion;
      ret.mainEntity.address.postalCode = HCAAPIConfig?.hQPostalCode;
      ret.mainEntity.address.streetAddress = HCAAPIConfig?.hQStreetAddress;
      ret.mainEntity.telephone = HCAAPIConfig?.generalConsultantBookingNumber;
      ret.mainEntity.image = specialistProfileData.images?.logo ?? '';
      ret.mainEntity.medicalSpecialty.name = topSpecialty
        ? topSpecialty[0].name
        : 'MD';
      ret.mainEntity.medicalSpecialty.url = `${site}/search-results?query=${ret.mainEntity.medicalSpecialty.name}`;
      ret.mainEntity.hasCredential[0].name = `${specialistProfileData.suffix}`;
      ret.mainEntity.hasCredential[0].id = `${segmentTracker}${specialistProfileData.slug}#Bio`;
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

// suggest a location interface
export interface ISuggestLocationFields {
  provider: string; //e.g.:Google
  searchTerm: string; //e.g.buckingham palace
  searchType: string; //e.g.Default
}

// suggest a location
export async function suggestLocation(
  fields: ISuggestLocationFields | any
): Promise<any> {
  //('fields', fields);

  let returnData: any = '';
  const HCAAPIConfig = await GetHCAConfig();

  const isLegacy: boolean = HCAAPIConfig?.aPI_HCA_Locations_UtilizesLegacy;

  let locationsURL = isLegacy
    ? HCAAPIConfig?.aPI_HCA_Locations_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_Locations_BaseURL;

  if (locationsURL) {
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    let urlParamsStr: string = JSON.stringify(fields);
    //console.log('bodyStr', urlParamsStr);
    //console.log('locationsURL', locationsURL);

    //console.log('isLegacy', isLegacy);
    if (isLegacy) {
      // convert params to path frags locationApi/suggestLocation/default/default/miles/default/
      locationsURL = `${locationsURL}/suggestLocation/${fields['provider']}/${fields['searchTerm']}/${fields['searchType']}`;
      //console.log('locationsURL', locationsURL);
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    } else {
      // convert from JSON to uri encoding
      const paramsArray = [];
      for (const property in fields) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(
          fields[property] == 'geoResolve' ? 'GeoResolve' : fields[property]
        );
        paramsArray.push(encodedKey + '=' + encodedValue);
      }
      urlParamsStr = paramsArray.join('&');
      //console.log('urlParamsStr', urlParamsStr);
      locationsURL = `${locationsURL}/SuggestLocation?${urlParamsStr}`;
      //console.log('locationsURL', locationsURL);
    }

    try {
      const res = await fetch(locationsURL, {
        method: 'get',
        //body: urlParamsStr,
        headers: headers,
        cache: 'no-cache',
      });

      if (res.ok) {
        returnData = await res.json();
      } else {
        //SuggestLocation call failed
        let errorDetails = '';
        try {
          errorDetails = await res.json();
        } finally {
        }
        returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}", "errorDetail": "${errorDetails}"}`;
        returnData = JSON.parse(returnData);
        console.error(`SuggestLocation failed with error ${returnData}`);
      }
    } catch (e) {
      //SuggestLocation call threw
      returnData = `{"errorCode": 999, "errorText": "An unexpected error occured posting SuggestLocation, please retry"}`;
      returnData = JSON.parse(returnData);
      console.error(`SuggestLocation failed with exception ${e}`);
    }
  }

  return returnData;
}

export interface IGetDistancesFields {
  provider: string; //e.g.:Google
  method: string; // e.g. Default
  units: string; //e.g. Kilometers
  order: string; // e.g. Default
  origin: string; // e.g. TN23%201DR
  originType: string; // e.g. Postcode
  destinations: string; //e.g.WD6%203BS%2C%20TN23%203DS
  destinationType: string; // e.g.Postcode
}

// get multiple distances
// e.g. /locationApi/getDistances/default/default/miles/default/Ashford%20TN23,%20UK/default/B15%202GW,W1G%208BJ,SW1W%208RH,SE1%202PR,W1W%205AH,W1U%205NY,NW8%209LE,SK9%201NY,M20%204BX,NW1%202BU,W1G%206AF,EC2N%201HT,EC2N%201AR,NW11%209PY,W4%204HS,SE1%209BS,W1T%207HA,WD6%203BS/postcode
// or   /locationapi/GetDistances?provider=Google&method=Default&units=Kilometers&order=Default&origin=TN23%201DR&originType=Postcode&destinations=WD6%203BS%2C%20TN23%203DS&destinationType=Postcode
export async function getDistances(
  fields: IGetDistancesFields | any
): Promise<any> {
  //console.log('fields', fields);

  let returnData: any = '';
  const HCAAPIConfig = await GetHCAConfig();

  const isLegacy: boolean = HCAAPIConfig?.aPI_HCA_Locations_UtilizesLegacy;
  //console.log('isLegacy', isLegacy);
  let locationsURL = isLegacy
    ? HCAAPIConfig?.aPI_HCA_Locations_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_Locations_BaseURL;

  if (locationsURL) {
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    let urlParamsStr: string = JSON.stringify(fields);
    //console.log('bodyStr', urlParamsStr);
    //console.log('locationsURL', locationsURL);

    if (isLegacy) {
      // convert params to path frags locationApi/getDistances/default/default/miles/default/
      locationsURL = `${locationsURL}/getDistances/${fields['provider']}/${fields['method']}/${fields['units']}/${fields['order']}/${fields['origin']}/${fields['originType']}/${fields['destinations']}/${fields['destinationType']}`;
      //console.log('locationsURL', locationsURL);
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    } else {
      // convert from JSON to uri encoding
      const paramsArray = [];
      for (const property in fields) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(fields[property]);
        paramsArray.push(encodedKey + '=' + encodedValue);
      }
      urlParamsStr = paramsArray.join('&');
      //console.log('urlParamsStr', urlParamsStr);
      locationsURL = `${locationsURL}/GetDistances?${urlParamsStr}`;
      //console.log('locationsURL', locationsURL);
    }

    try {
      const res = await fetch(locationsURL, {
        method: 'get',
        //body: urlParamsStr,
        headers: headers,
        cache: 'no-cache',
      });

      if (res.ok) {
        returnData = await res.json();
      } else {
        //getDistances call failed
        let errorDetails = '';
        try {
          errorDetails = await res.json();
        } finally {
        }
        returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}", "errorDetail": "${errorDetails}"}`;
        returnData = JSON.parse(returnData);
        console.error(`getDistances failed with error ${returnData}`);
      }
    } catch (e) {
      //makeBookingEnquiry call threw
      returnData = `{"errorCode": 999, "errorText": "An unexpected error occured posting getDistances, please retry"}`;
      returnData = JSON.parse(returnData);
      console.error(`getDistances failed with exception ${e}`);
    }
  }

  return returnData;
}

export interface IEnquiryFormFields {
  practice: string; //e.g. Golders Green Outpatients and Diagnostics Centre
  dateAppointment: string; // e.g. Within 1 week
  timeAppointment: string; // e.g. Morning
  previousPatient: string; // e.g. Yes
  title: string; // e.g. Mr
  firstName: string; // e.g. ZZZTESTFIRSTNAME
  lastName: string; // e.g. ZZZTESTLASTNAME
  gender: string; // e.g. Male
  date: string; // e.g. 2000-01-01
  userPhone: string; // e.g. 07788999000
  userEmail: string; // e.g. test@ignore.domain
  insurance: string; // e.g. CS Healthcare
  insuranceNumber: string; // e.g. INS0987654321
  reasonVisit: string; // e.g. TESTING THE FORM PLEASE IGNORE
  reCAPTCHA: string; // e.g. 03AFcWeA48YI466Mx0YoBsmqYBcE-b5Hodyn-VyHqt1HYbKeXbCxhtba1HxDH2TF9LnizAxxMc0_WheDYb8gODux5A0e7naWbh_UDu3HDq1Y9u-h_MP2PHvN9d8x_lvFE68jywnpd71mf8bCUooOjxnvTOWNhd3h634PFLsZqNCFAXjhEMwloTGiwYSCspK-r7ecxTKU8SXj0HG2oBBKIOvOCeVJlKFRORvoEAPBTM_IPiw87YjVKCPyc8NfPLyM8KCdhAtjvEy8NRv7Bgs0c2n9adLKbpSjvGoXP7mD28Fv9E3EN0-fYipSFXgPgqDETBuAYbZyw4L8G_kfzFeL5PJ5dWzw4O5HrdS9cb5AyiPaG6rJVWwHKQCG0eROo2yMXSTWPLIWGFdAvL5quxH7pZ7vRoP700XUwusZsP1VCtmYA45EgWOx4zRgWcj1PaExyp6dNuH6U-T98uQ5QbYrsZwN1jP-ddQd2Q3G_Rs5gtGKzQ_xJnuH6w4w1kxxFFauJwzZtnQBNysSXl6ChvYLy2Fqw6nLcN2PTWEgBVkmrupfzEVAzXMMraVMG7swZuv5J9p9DB9diSWncGRoyBxOkfqdSEANeRmNxPJ42denWxzzHoaJ6sHPsc7nD8ypXZfToKE4-LXhfRy4EBcKDyoSTP88Z6NSjXyo83tSlkhz-YykiW7Kln9MygtCs
  email: boolean; // e.g. true
  sms: boolean; // e.g. true
  phone: boolean; // e.g. true
  post: boolean; // e.g. true
  dateOfBirthFormatted: string; // e.g. 01-01-2000
  consultantName: string; // e.g. Rohit Shetty
  consultantTopSpecialty: string; // e.g. Orthopaedic Surgery
  hiddenFormInstance: string; // e.g. 37bf88-ce54-dfa8-572c-5315bd5a8b58
}

/*
This endpoint will create and send a booking enquiry request to the contact centre via the email and enquiry database.  
The Team members will pick up the request and once processed will contact the patient
*/
export async function submitBookingEnquiry(
  fields: IEnquiryFormFields | any
): Promise<any> {
  let returnData: any = '';
  const HCAAPIConfig = await GetHCAConfig();

  const isLegacy: boolean =
    HCAAPIConfig?.aPI_HCA_EnquireBookingForm_UtilizesLegacy;

  const formURL = isLegacy
    ? HCAAPIConfig?.aPI_HCA_EnquireBookingForm_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_EnquireBookingForm_BaseURL;

  if (formURL) {
    const body = [];
    let headers: HeadersInit;
    let bodyStr: string = '';
    if (isLegacy) {
      //  // convert from JSON to uri form encoding for SC9.3 form style
      for (const property in fields) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(fields[property]);
        body.push(encodedKey + '=' + encodedValue);
      }
      bodyStr = body.join('&');
      //console.log('bodyStr', bodyStr);
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    } else {
      bodyStr = JSON.stringify(fields);
      //console.log('bodyStr', bodyStr);
      headers = {
        'Content-Type': 'application/json',
      };
    }

    try {
      //console.log('submit form to', formURL);
      const res = await fetch(formURL, {
        method: 'post',
        body: bodyStr,
        headers: headers,
        cache: 'no-cache',
      });

      //console.log('res', res);
      if (res.ok) {
        const retData = await res.text();
        //console.log('retData', retData);
        returnData = JSON.parse(retData);
      } else {
        //submitBookingEnquiry call failed
        let errorDetails = '';
        try {
          errorDetails = await res.text();
        } finally {
        }
        returnData = `{"errorCode": ${res.status}, "errorText": "${
          res.statusText
        }", "errorDetail": "${JSON.stringify(errorDetails)}"}`;
        console.error(`submitBookingEnquiry failed with error ${returnData}`);
        returnData = JSON.parse(returnData);
      }
    } catch (e) {
      //makeBookingEnquiry call threw
      const errorText =
        HCAAPIConfig?.aPI_HCA_EnquireBookingForm_ErrorSubmittingText ||
        'An unexpected error occured posting submitBookingEnquiry, please retry';
      returnData = `{"errorCode": 999, "errorText": "${errorText}"}`;
      returnData = JSON.parse(returnData);
      console.error(
        `submitBookingEnquiry failed with exception ${e}, bodystr ${bodyStr}`
      );
    }
  }

  return returnData;
}

// find an address from a postcode interface
export interface IFindAddressFields {
  postcode: string; //e.g. TN23 or TN23 3DS
}

// find an address from a postcode
export async function findAddress(
  fields: IFindAddressFields | any
): Promise<any> {
  //console.log('fields', fields);

  let returnData: any = '';
  const HCAAPIConfig = await GetHCAConfig();

  const isLegacy: boolean = HCAAPIConfig?.aPI_HCA_PostcodeLookup_UtilizesLegacy;

  let addressLookupURL = isLegacy
    ? HCAAPIConfig?.aPI_HCA_PostcodeLookup_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_PostcodeLookup_BaseURL;

  if (addressLookupURL) {
    // multi-part form post
    const formData = new FormData();
    addressLookupURL = `${addressLookupURL}/FindAddress`;
    //console.log('addressLookupURL', addressLookupURL);
    for (const property in fields) {
      formData.append(property, fields[property]);
    }

    try {
      //console.log('submit form to', formURL);
      const res = await fetch(addressLookupURL, {
        method: 'post',
        body: formData,
        cache: 'no-cache',
      });

      //console.log('res', res);
      if (res.ok) {
        const retData = await res.text();
        //console.log('res.ok json', retData);
        returnData = JSON.parse(retData);
      } else {
        //findAddress call failed
        let errorDetails = '';
        try {
          errorDetails = await res.text();
        } finally {
        }
        returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}", "errorDetail": "${errorDetails}"}`;
        returnData = JSON.parse(returnData);
        console.error(`findAddress failed with error ${returnData}`);
      }
    } catch (e) {
      //findAddress call threw
      returnData = `{"errorCode": 999, "errorText": "An unexpected error occured posting findAddress, please retry"}`;
      returnData = JSON.parse(returnData);
      console.error(`findAddress failed with exception ${e}`);
    }
  }

  return returnData;
}

// find an address from a postcode interface
export interface ISplitAddressFields {
  monikerField: string; //e.g. code returned by find address
}

// find an address from a postcode
export async function splitAddress(
  fields: ISplitAddressFields | any
): Promise<any> {
  //console.log('fields', fields);

  let returnData: any = '';
  const HCAAPIConfig = await GetHCAConfig();

  const isLegacy: boolean = HCAAPIConfig?.aPI_HCA_PostcodeLookup_UtilizesLegacy;

  let splitAddressURL = isLegacy
    ? HCAAPIConfig?.aPI_HCA_PostcodeLookup_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_PostcodeLookup_BaseURL;

  if (splitAddressURL) {
    // multi-part form post
    const formData = new FormData();
    splitAddressURL = `${splitAddressURL}/SplitAddress`;
    //console.log('splitAddressURL', splitAddressURL);
    for (const property in fields) {
      formData.append(property, fields[property]);
    }

    try {
      //console.log('submit form to', formURL);
      const res = await fetch(splitAddressURL, {
        method: 'post',
        body: formData,
        cache: 'no-cache',
      });

      //console.log('res', res);
      if (res.ok) {
        const retData = await res.text();
        //console.log('res.ok json', retData);
        returnData = JSON.parse(retData);
      } else {
        //findAddress call failed
        let errorDetails = '';
        try {
          errorDetails = await res.text();
        } finally {
        }
        returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}", "errorDetail": "${errorDetails}"}`;
        returnData = JSON.parse(returnData);
        console.error(`splitAddress failed with error ${returnData}`);
      }
    } catch (e) {
      //findAddress call threw
      returnData = `{"errorCode": 999, "errorText": "An unexpected error occured posting splitAddress, please retry"}`;
      returnData = JSON.parse(returnData);
      console.error(`splitAddress failed with exception ${e}`);
    }
  }

  return returnData;
}

export interface ILogEmailFields {
  profileType: string; // e.g. 404Report
  freeText: string;
}

/*
This endpoint will create and send an email, can be used to alert to specific events  
Set the profileType in the ILogEmailFields. 
It should match the second part of the name of the profile of the email in the Sitecore Form Api Settings Container
e.g. profileType would be 404Report to target LogEmail_404Report
*/
export async function submitLogEmail(fields: ILogEmailFields): Promise<any> {
  let returnData: any = '';

  const baseURL =
    process.env.INTEGRATION_LAYER_URL ??
    'https://digital-int-dev.hcahealthcareqa.co.uk';
  const formURL = `${baseURL}/api/sitecore/LogEmail/${fields.profileType}/1/en`;

  //console.log('formURL', formURL);
  if (formURL) {
    let bodyStr: string = '';

    bodyStr = JSON.stringify(fields);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    try {
      //console.log('submit form to', formURL);
      const res = await fetch(formURL, {
        method: 'post',
        body: bodyStr,
        headers: headers,
        cache: 'no-cache',
      });

      //console.log('res status:', res?.status, res?.statusText);
      if (res.ok) {
        const retData = await res.text();
        //console.log('retData', retData);
        returnData = JSON.parse(retData);
      } else {
        //submitLogEmail call failed
        let errorDetails = '';
        try {
          errorDetails = await res.text();
          console.error('submitLogEmail errorDetails', errorDetails);
        } finally {
          returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}", "errorDetail": "${errorDetails}"}`;
          returnData = JSON.parse(returnData);
          console.error(`submitLogEmail failed with error ${returnData}`);
        }
      }
    } catch (e) {
      //submitLogEmail call threw
      const errorText =
        'An unexpected error occured posting submitLogEmail, please retry';
      returnData = `{"errorCode": 999, "errorText": "${errorText}"}`;
      returnData = JSON.parse(returnData);
      console.error(`submitLogEmail failed with exception ${e}`);
    }
  }

  return returnData;
}
