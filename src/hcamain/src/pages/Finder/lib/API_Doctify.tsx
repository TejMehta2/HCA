import { getHCAConfig } from './getHCAConfig';
import { getDoctifyConfig } from './getDoctifyConfig';
import { getLDBFirstAppointmentData } from './API_C2';
import { checkIfLiveBookingIsAvailable } from './API_HCA';

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
          const isLiveDiaryConsultant =
            await checkIfLiveBookingIsAvailable(slug);
          docitfyData.isLiveDiaryConsultant = isLiveDiaryConsultant;
        } catch (e) {
          console.error(
            `getSpecialistProfileData failed to patch in isLiveDiaryConsultant ${e}, slug: ${slug}`
          );
        }

        if (docitfyData.isLiveDiaryConsultant) {
          try {
            // gmcNumber
            const gmcNumber = docitfyData?.registrationBodies.filter(
              (item: any) => item.name === 'General Medical Council'
            )[0]?.registrationNumber;
            const res = await getLDBFirstAppointmentData(gmcNumber); // e.g. "4113571"
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
  const requestURL = `${
    serviceURL ?? HCAAPIConfig.aPI_HCA_DoctifyToFacilities_BaseURL
  }`;
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
