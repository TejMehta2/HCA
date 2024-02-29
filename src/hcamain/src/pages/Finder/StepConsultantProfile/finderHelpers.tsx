/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'node-html-parser';
import { getHCAConfig } from './getHCAConfig';
import { getDoctifyConfig } from './getDoctifyConfig';
import { getC2Config } from './getC2Config';

// get all the active hca consultants on consultant finder
//const consultantSlugsURL = `https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml`;
export async function getActiveConsultantSlugs(): Promise<string[]> {
  let slugs: string[] = [];
  const HCAAPIConfig = await getHCAConfig();
  const consultantSlugsURL = HCAAPIConfig?.aPI_HCA_LDB_Consultants_BaseURL;
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
//const ldbConsultantSlugsURL = `https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/ldbConsultants`;
export async function getActiveLiveDiaryConsultantSlugs(): Promise<string[]> {
  let ldbSlugs: string[] = [];
  const HCAAPIConfig = await getHCAConfig();
  const ldbConsultantSlugsURL = HCAAPIConfig?.aPI_HCA_LDB_Consultants_BaseURL;
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
//const Doctify_Specialists_URL = 'https://api.doctify.com/api/hca/specialists';
export async function getSpecialistProfileData(
  slug: string,
  serviceURL?: string
): Promise<any> {

  const DoctifyConfig = await getDoctifyConfig();
  //console.log(DoctifyConfig);
  const Doctify_Specialists_URL = DoctifyConfig.aPI_DoctifySpecialists_BaseURL;

  const requestURL = `${serviceURL ?? Doctify_Specialists_URL}/${slug}`;
  let docitfyData: any = '';
  try {
    // need to cache these requests so we don't make hundreds of them
    // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
    const res = await fetch(requestURL, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      docitfyData = await res.json();

      // patch in HCA facilities on doctify practice entries
      if (docitfyData) {
        let practice: any;
        for (practice in docitfyData?.practices) {
          try {
            const facilityURL = await facilityURLFromDoctifySlug(
              docitfyData?.practices[practice]?.slug
            );
            docitfyData.practices[practice]['facilityURL'] = facilityURL;
          } catch (e) {
            //HCA practice call threw
            console.error(
              `getSpecialistProfileData failed to patch in HCA facility in practice data ${e}, slug: ${docitfyData?.practices[practice]?.slug}`
            );
          }
        }

        docitfyData.isLiveDiaryConsultant = false;
        try {
          const isLiveDiaryConsultant = await checkIfLiveBookingIsAvailable(slug);
          docitfyData.isLiveDiaryConsultant = isLiveDiaryConsultant;
        } catch (e) {
          console.error(
            `getSpecialistProfileData failed to patch in isLiveDiaryConsultant ${e}, slug: ${slug}`
          );
        }

        if(docitfyData.isLiveDiaryConsultant)
        {
          try {
            // gmcNumber
            const gmcNumber = docitfyData?.registrationBodies.filter(
              (item: any) => item.name === 'General Medical Council'
            )[0]?.registrationNumber;
            const res = await LDB_FirstAppointment(gmcNumber); // e.g. "4113571"
            docitfyData.gmcNumber = gmcNumber;
            docitfyData.firstAppointment = res;
            //console.log("first apt:", res);
          } catch (e) {
            //first appointment call threw
            console.error(
              `getSpecialistProfileData failed to patch in first appointment ${e}, slug: ${slug}`
            );
          }
        }
      }
    } else {
      //docitfy call failed
      docitfyData = `{"errorCode": ${res.status}, "errorText": ${res.statusText}}`;
      console.error(
        `getSpecialistProfileData failed with error ${docitfyData}`
      );
    }
  } catch (e) {
    //docitfy call threw
    docitfyData = `{"errorCode": 999, "errorText": "An unexpected error occured fetching the getSpecialistProfileData, please retry"}`;
    console.error(`getSpecialistProfileData failed with exception ${e}`);
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

// get HCA facilities data
//const Doctify_To_HCA_Facilities_URL = `https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/doctifyFacilities`;
export async function getFacilitiesData(serviceURL?: string): Promise<any> {
  const HCAAPIConfig = await getHCAConfig();
  const requestURL = `${serviceURL ?? HCAAPIConfig.aPI_HCA_DoctifyToFacilities_BaseURL}`;
  let facilitiesData: any = '';
  try {
    // need to cache these requests so we don't make hundreds of them
    // ... https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
    const res = await fetch(requestURL, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    /* if running client side, CORS
    const res = await fetch(requestURL, {
      headers: 
      {
        "Content-Type": "application/json",
        'mode':'no-cors'
      },
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });*/

    if (res.ok) {
      facilitiesData = await res.json();
    } else {
      //docitfy call failed
      facilitiesData = `{"errorCode": ${res.status}, "errorText": ${res.statusText}}`;
      console.error(`getFacilitiesData failed with error ${facilitiesData}`);
    }
  } catch (e) {
    //docitfy call threw
    facilitiesData = `{"errorCode": 999, "errorText": "An unexpected error occured fetching getFacilitiesData, please retry"}`;
    console.error(`getFacilitiesData failed with exception ${e}`);
  }
  return facilitiesData;
}

// get the HCA facility url from the Doctify practice slug
export async function facilityURLFromDoctifySlug(
  doctifyLocationSlug: string
): Promise<string> {
  let locationURL: string = '';
  const facilities = await getFacilitiesData();

  if (facilities.findIndex) {
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

// first appointment
// post in GMC number/s
//{
//  "consultants" : ["4113571","6140048","2805843"]
//}
// returns
/*
{
    "availability": [
        {
            "initial_appointment": "2024-02-24T08:00:00Z",
            "follow_appointment": "2024-02-24T08:00:00Z",
            "gmc": "4113571",
            "mnemonic": "GOLDAND",
            "refreshdate": "2024-02-22T15:45:07Z"
        },
        {
            "initial_appointment": "2024-03-27T09:30:00Z",
            "follow_appointment": "2024-03-13T09:45:00Z",
            "gmc": "2805843",
            "mnemonic": "DAVJENN",
            "refreshdate": "2024-02-22T15:47:44Z"
        },
        {
            "initial_appointment": "2024-02-26T16:15:00Z",
            "follow_appointment": "2024-02-26T16:15:00Z",
            "gmc": "6140048",
            "mnemonic": "IBRMAZ",
            "refreshdate": "2024-02-22T15:48:46Z"
        }
    ]
}
*/
export async function LDB_FirstAppointment(
  gmcNumber: string,
  serviceURL?: string
): Promise<any> {
  const config = await getC2Config();
  const requestURL = `${serviceURL ?? config.aPI_C2_FirstAppointment_BaseURL}`;

  let firstAppointmentData: string = '';
  const body = `{"consultants" : ["${gmcNumber}"] }`;
  try {
    // very light cache on these requests they contain time sensitive data
    const res = await fetch(requestURL, {
      method: 'post',
      body: body,
      headers: {
        "content-type": "application/json",
        "securitytoken": `"${config.aPI_C2_FirstAppointment_Header}"`
      }, 
      cache: 'force-cache',
      next: { revalidate: 10 },
    });
    if (res.ok) {
      let result = await res.json();
      if(result && result.availability && result.availability.length == 1)
      {
        firstAppointmentData = result.availability[0];
      }
    } else {
      //docitfy call failed
      firstAppointmentData = `{"errorCode": ${res.status}, "errorText": ${res.statusText}}`;
      console.error(
        `LDB_FirstAppointment failed with error ${firstAppointmentData}`
      );
    }
  } catch (e) {
    //docitfy call threw
    firstAppointmentData = `{"errorCode": 999, "errorText": "An unexpected error occured fetching LDB_FirstAppointment, please retry"}`;
    console.error(`LDB_FirstAppointment failed with exception ${e}`);
  }

  return firstAppointmentData;
}
