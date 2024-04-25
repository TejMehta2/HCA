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
  const ldbConsultantSlugsURL =
    HCAAPIConfig?.aPI_HCA_LDB_Consultants_UtilizesLegacy
      ? HCAAPIConfig?.aPI_HCA_LDB_Consultants_LegacyBaseURL
      : HCAAPIConfig?.aPI_HCA_LDB_Consultants_BaseURL;

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

// get all the holidays
// e.g. https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/holidays
export async function getHolidays(): Promise<string[]> {
  let holidays;
  const HCAAPIConfig = await getHCAConfig();
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
export async function getPhysicianStructuredData(
  slug: string,
  specialistProfileData?: any // can be passed in to save a second call
): Promise<any> {
  if (!specialistProfileData) {
    specialistProfileData = await getSpecialistProfileData(slug);
  }
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

// suggest a location
export async function suggestLocation(
  provider: string, //e.g.:Google
  method: string, // e.g. Default
  units: string, //e.g. Kilometers
  order: string, // e.g. Default
  origin: string, // e.g. TN23%201DR
  originType: string, // e.g. Postcode
  destinations: string, //e.g.WD6%203BS%2C%20TN23%203DS
  destinationType: string // e.g.Postcode
): Promise<any> {
  let cma;
  //const HCAAPIConfig = await getHCAConfig();
  console.log(
    provider,
    method,
    units,
    order,
    origin,
    originType,
    destinations,
    destinationType
  );
  /*
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
  }*/

  return cma;
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
  const HCAAPIConfig = await getHCAConfig();

  const isLegacy: boolean = HCAAPIConfig?.aPI_HCA_Locations_UtilizesLegacy;

  let locationsURL = isLegacy
    ? HCAAPIConfig?.aPI_HCA_Locations_LegacyBaseURL
    : HCAAPIConfig?.aPI_HCA_Locations_BaseURL;

  if (locationsURL) {
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    let urlParamsStr: string = JSON.stringify(fields);
    console.log('bodyStr', urlParamsStr);
    console.log('locationsURL', locationsURL);

    console.log('isLegacy', isLegacy);
    if (isLegacy) {
      // convert params to path frags locationApi/getDistances/default/default/miles/default/
      locationsURL = `{locationsURL}/locationApi/getDistances/${fields['provider']}/${fields['method']}/${fields['units']}/${fields['order']}/${fields['origin']}/${fields['originType']}/${fields['destinations']}/${fields['destinationType']}`;
      console.log('locationsURL', locationsURL);
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    } else {
      // convert from JSON to uri form encoding for SC9.3 form style
      const paramsArray = [];
      for (const property in fields) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(fields[property]);
        paramsArray.push(encodedKey + '=' + encodedValue);
      }
      urlParamsStr = JSON.stringify(fields);
      urlParamsStr = paramsArray.join('&');
      console.log('urlParamsStr', urlParamsStr);
      locationsURL += '/GetDistances?' + urlParamsStr;
      //console.log('bodyStr', bodyStr);
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
  const HCAAPIConfig = await getHCAConfig();

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
      const res = await fetch(formURL, {
        method: 'post',
        body: bodyStr,
        headers: headers,
        cache: 'no-cache',
      });

      if (res.ok) {
        returnData = JSON.parse(await res.text());
      } else {
        //makeBookingEnquiry call failed
        let errorDetails = '';
        try {
          errorDetails = await res.text();
        } finally {
        }
        returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}", "errorDetail": "${errorDetails}"}`;
        returnData = JSON.parse(returnData);
        console.error(`makeBookingEnquiry failed with error ${returnData}`);
      }
    } catch (e) {
      //makeBookingEnquiry call threw
      returnData = `{"errorCode": 999, "errorText": "An unexpected error occured posting makeBookingEnquiry, please retry"}`;
      returnData = JSON.parse(returnData);
      console.error(`makeBookingEnquiry failed with exception ${e}`);
    }
  }

  return returnData;
}
