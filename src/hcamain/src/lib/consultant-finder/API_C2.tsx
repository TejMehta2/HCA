/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetC2Config } from './getC2Config';
import { revalidate } from './revalidateNow';

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
// pass an array of gmc numbers
export async function getLDBFirstAppointmentDatas(
  gmcNumber: string[], // pass as individual gmcNumber=xx&gmcNumber=yy
  gmcNumbers: string, // pass as comma separated gmcNumbers=xx,yy
  serviceURL?: string,
  headerKey?: string
): Promise<any> {
  // preference is passed params, otherwise get from settings
  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  const requestURL = `${serviceURL ?? config?.aPI_C2_FirstAppointment_BaseURL}`;
  const header = `${headerKey ?? config?.aPI_C2_FirstAppointment_Header}`;

  let returnData: any = '';
  let gmcArray: string[] = [];
  if (gmcNumber) {
    gmcArray = gmcArray.concat(gmcNumber);
  }

  if (gmcNumbers) {
    gmcArray = gmcArray.concat(gmcNumbers?.split(','));
  }

  const gmcArrayBody = gmcArray?.map((gmc: any) => '"' + gmc).join('",') + '"';
  const body = `{"consultants" : [${gmcArrayBody}] }`;
  //console.log("body", body);

  try {
    // very light cache on these requests they contain time sensitive data
    const res = await fetch(requestURL, {
      method: 'post',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        securitytoken: `"${header}"`,
      },
      cache: 'force-cache',
      next: {
        revalidate: revalidate.now() || revalidate.noCache() ? false : 60,
      },
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.availability) {
        //console.log("result.availability", result.availability);
        result.availability.forEach(
          (retRecord: { refreshdate: string; refreshedText: string }) => {
            calcMinutesSinceUpdate(retRecord);
          }
        );
      }

      // remap in the correct order and provide null for entries where no info was found
      returnData = gmcArray.map((gmc: any) =>
        (result.availability as object[]).find((rec: any) => rec.gmc == gmc)
      );
    } else {
      //C2 call failed
      returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}"}`;
      returnData = JSON.parse(returnData);
      console.error(
        `getLDBFirstAppointmentData failed with error ${returnData}`
      );
    }
  } catch (e) {
    //C2 call threw
    const errorText =
      config?.aPI_C2_FirstAppointment_NoResultsMsg ||
      'An unexpected error occured fetching getLDBFirstAppointmentData, please retry';
    returnData = `{"errorCode": 994, "errorText": "${errorText}"}`;
    returnData = JSON.parse(returnData);
    console.error(`getLDBFirstAppointmentData failed with exception ${e}`);
  }

  return returnData;
}

// pass a single gmc number
export async function getLDBFirstAppointmentData(
  gmcNumber: string,
  serviceURL?: string,
  headerKey?: string
): Promise<any> {
  // preference is passed params, otherwise get from settings
  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  const requestURL = `${serviceURL ?? config?.aPI_C2_FirstAppointment_BaseURL}`;
  const header = `${headerKey ?? config?.aPI_C2_FirstAppointment_Header}`;

  let returnData: string = '';
  const body = `{"consultants" : ["${gmcNumber}"] }`;
  try {
    // very light cache on these requests they contain time sensitive data
    const res = await fetch(requestURL, {
      method: 'post',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        securitytoken: `"${header}"`,
      },
      cache: 'force-cache',
      next: {
        revalidate: revalidate.now() || revalidate.noCache() ? false : 60,
      },
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.availability && result.availability.length == 1) {
        const retRecord = result.availability[0];
        calcMinutesSinceUpdate(retRecord);
        returnData = retRecord;
      }
    } else {
      //C2 call failed
      returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}"}`;
      returnData = JSON.parse(returnData);
      console.error(
        `getLDBFirstAppointmentData failed with error ${returnData}`
      );
    }
  } catch (e) {
    //C2 call threw
    const errorText =
      config?.aPI_C2_FirstAppointment_NoResultsMsg ||
      'An unexpected error occured fetching getLDBFirstAppointmentData, please retry';
    returnData = `{"errorCode": 996, "errorText": "${errorText}"}`;
    returnData = JSON.parse(returnData);
    console.error(`getLDBFirstAppointmentData failed with exception ${e}`);
  }

  return returnData;
}

function calcMinutesSinceUpdate(record: any) {
  try {
    const timeRefreshed = Date.parse(record?.refreshdate);
    const timeSpanRefreshed = Date.now() - timeRefreshed;
    const minsSinceRefreshed = Math.max(
      0,
      Math.floor(timeSpanRefreshed / (1000 * 60))
    );
    if (isNaN(minsSinceRefreshed)) {
      record.refreshedText = 'unavailable';
    } else if (minsSinceRefreshed == 0) {
      record.refreshedText = 'now';
    } else {
      record.refreshedText = `${minsSinceRefreshed} ${
        minsSinceRefreshed > 1 ? 'minutes' : 'minute'
      } ago`;
    }
  } catch (e) {
    console.warn(
      `issue doing time conversion in getLDBFirstAppointmentData exception:${e}`
    );
  }
}
/*
The Consultant Details API is fed a consultant GMC number, and the appointment type required (initial or 
follow on). It returns basic details around the consultant, and a list of the consultant’s availability at the HCA 
facilities (if any) with the first available time included for each location. It is expected that the caller should 
store the GUIDs for the consultant (CRMID), and facility (facilityCRMID), and the HCA facility location 
(facilityLocation) which will be passed and used on further calls.
*/
export async function getLDBConsultantDetails(
  GMCNumber: string, // or 4066576
  isFollowOnAppointment: boolean, // true if follow up false if initial
  serviceURL?: string,
  headerKey?: string
): Promise<any> {
  // preference is passed params, otherwise get from settings
  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  const followOnFrag = isFollowOnAppointment
    ? `followonappointment=yes`
    : `initialappointment=yes`;
  const requestURL = `${
    serviceURL ?? config?.aPI_C2_GetConsultantDetails_BaseURL
  }&HCAConsultantId=${GMCNumber}&${followOnFrag}`;
  const header = `${headerKey ?? config?.aPI_C2_GetConsultantDetails_Header}`;

  let returnData: any = '';

  try {
    // very light cache on these requests they contain time sensitive data
    const res = await fetch(requestURL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        securitytoken: `"${header}"`,
      },
      cache: 'force-cache',
      next: {
        revalidate: revalidate.now() || revalidate.noCache() ? false : 60,
      },
    });
    if (res.ok) {
      returnData = await res.json();
      // put spaces after commas in C2 facilities
      if (returnData && returnData.availability) {
        returnData.availability.forEach(
          (availability: { facilityAddress: string }) => {
            if (availability.facilityAddress) {
              availability.facilityAddress =
                availability.facilityAddress.replaceAll(',', ', ');
            }
          }
        );
      }
    } else {
      //C2 call failed
      returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}"}`;
      returnData = JSON.parse(returnData);
      console.error(`getLDBConsultantDetails failed with error ${returnData}`);
    }
  } catch (e) {
    //C2 call threw
    console.error(`getLDBConsultantDetails failed with exception ${e}`);
    const errorText =
      config?.aPI_C2_GetConsultantDetails_NoResultsMsg ||
      'An unexpected error occured fetching getLDBConsultantDetails, please retry';
    returnData = `{"errorCode": 995, "errorText": "${errorText}"}`;
    returnData = JSON.parse(returnData);
  }

  return returnData;
}

/*
The Consultant Availability API is used to discover the available slots for a given consultant at a given 
facility location for a given date range.
*/
export async function getLDBConsultantSlots(
  DateFrom: string, // 2024-07-12
  DateTo: string, // 2024-07-13
  isFollowOnAppointment: boolean, // true if follow up false if initial
  ConsultantGUID?: string, // or HCAConsultantId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  LocationGUID?: string, // or LocationId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  HCAConsultantId?: string, // or e.g. ConsultantGUID 4066576
  LocationId?: string, // or LocationGUID e.g.COCLB
  serviceURL?: string,
  headerKey?: string
): Promise<any> {
  // preference is passed params, otherwise get from settings
  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  const followOnFrag = isFollowOnAppointment
    ? `followonappointment=yes`
    : `initialappointment=yes`;
  const fragConsultant = ConsultantGUID
    ? `ConsultantGUID=${ConsultantGUID}`
    : `HCAConsultantId=${HCAConsultantId}`;
  const fragLocation = LocationGUID
    ? `LocationGUID=${LocationGUID}`
    : `LocationId=${LocationId}`;
  const requestURL = `${
    serviceURL ?? config?.aPI_C2_GetConsultantSlots_BaseURL
  }&${fragConsultant}&${fragLocation}&DateFrom=${DateFrom}&DateTo=${DateTo}&${followOnFrag}`;
  const header = `${headerKey ?? config?.aPI_C2_GetConsultantSlots_Header}`;

  let returnData: string = '';

  try {
    // very light cache on these requests they contain time sensitive data
    const res = await fetch(requestURL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        securitytoken: `"${header}"`,
      },
      cache: 'force-cache',
      next: {
        revalidate: revalidate.now() || revalidate.noCache() ? false : 60,
      },
    });
    if (res.ok) {
      returnData = await res.json();
    } else {
      //C2 call failed
      returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}"}`;
      returnData = JSON.parse(returnData);
      console.error(`getLDBConsultantSlots failed with error ${returnData}`);
    }
  } catch (e) {
    //C2 call threw
    const errorText =
      config?.aPI_C2_GetConsultantSlots_NoResultsMsg ||
      'An unexpected error occured fetching getLDBConsultantSlots, please retry';
    returnData = `{"errorCode": 990, "errorText": "${errorText}"}`;
    returnData = JSON.parse(returnData);
    console.error(`getLDBConsultantSlots failed with exception ${e}`);
  }

  return returnData;
}

export interface ILDBDemographics {
  previouslyBeenWithHCA: boolean;
  patientCode: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  towncity: string;
  postcode: string;
  country: string;
  marketingPreferenceEmail: boolean;
  marketingPreferencePhone: boolean;
  marketingPreferenceSMS: boolean;
  marketingPreferencePost: boolean;
  selectedSpeciality: string;
  datesCannotDo: string;
  representativeTitle: string;
  representativeFirstName: string;
  representativeLastName: string;
  representativeRelation: string;
  representativeEmail: string;
  representativePhone: string;
  bookingBy: string;
  paidBy: string;
  gpreferral: boolean;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceAuthorisationCode: string;
}

/*
This endpoint will create a Diary Booking in the CRM for the Consultant in a Pending state.  
The Diary Booking will also be placed on the Booking Queue so it can be actioned by the team.  
The Pending state reflects that the Diary Booking needs to be processed to Meditech by one of the team members.  
The Team members will pick a Diary Booking off the Queue and once processed will 
update the status to a relevant status e.g. Confirmed or Cancelled.  
*/
export async function LDBMakeBooking(
  dateFrom: string, // e.g. 2023-08-29T10:30:00
  isFollowOnAppointment: boolean, // true if follow up false if initial
  demographics: ILDBDemographics, // demographics of the patient
  reasonForAppointment: string, // free format reason for the appointment
  recaptcha: string,
  selectedSpeciality: string, // e.g. "Orthopaedic Surgery" from the page
  ConsultantGUID?: string, // or HCAConsultantId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  LocationGUID?: string, // or LocationId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  HCAConsultantId?: string, // or e.g. ConsultantGUID 4066576
  FacilityId?: string, // or LocationGUID e.g.COCLB
  serviceURL?: string,
  headerKey?: string
): Promise<any> {
  let returnData: string = '';
  let okayToSend: boolean = true;

  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  // first, validate reCapture
  try {
    let captchaValidation = null;
    if (process.env.RECAPTCHA_SECRET_KEY) {
      // if the private key is set then validate server side
      // Ping the google recaptcha verify API to verify the captcha code you received
      //console.log(
      //  'validate url',
      //  `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
      //);
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
          method: 'POST',
        }
      );
      captchaValidation = await response.json();
      /**
     * The structure of response from the veirfy API is
     * {
     *  "success": true|false,
     *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
     *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
     *  "error-codes": [...]        // optional
      }
     */
      if (!captchaValidation.success) {
        okayToSend = false;
      }
    }

    if (okayToSend) {
      // preference is passed params, otherwise get from settings
      const fragFollowOn = isFollowOnAppointment
        ? `"initialappointment": null, "followonappointment": "yes"`
        : `"initialappointment": "yes", "followonappointment": null`;
      const fragConsultant = ConsultantGUID
        ? `"ConsultantGUID": "${ConsultantGUID}"`
        : `"HCAConsultantId": "${HCAConsultantId}"`;
      const fragLocation = LocationGUID
        ? `"LocationGUID": "${LocationGUID}"`
        : `"FacilityId": "${FacilityId}"`;
      const requestURL = `${
        serviceURL ?? config?.aPI_C2_ReserveConsultantSlot_BaseURL
      }`;
      const header = `${
        headerKey ?? config?.aPI_C2_ReserveConsultantSlot_Header
      }`;

      let demographicsString = JSON.stringify(demographics).substring(1);
      demographicsString =
        '{' +
        demographicsString.substring(0, demographicsString.length - 1) +
        '}';

      const body = `{
        ${fragConsultant},
        ${fragLocation},
        "dateFrom": "${dateFrom}",
        ${fragFollowOn},
        "patientCode": "${
          demographics?.patientCode ? demographics?.patientCode : ''
        }",
        "demographics": ${demographicsString},
        "visitReasonDetails": {
            "selectedSpeciality": "${selectedSpeciality}",
            "reasonForAppointment": "${reasonForAppointment}"
        }
      }`;
      //console.log('booking json:', body);
      try {
        const res = await fetch(requestURL, {
          method: 'post',
          body: body,
          headers: {
            'Content-Type': 'application/json',
            securitytoken: `"${header}"`,
          },
          cache: 'no-cache',
        });

        if (res.ok) {
          returnData = await res.json();
        } else {
          //C2 call failed
          let errorDetails = '';
          try {
            errorDetails = await res.text();
          } finally {
          }
          returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}", "errorDetail": "${errorDetails}"}`;
          console.warn(`LDBMakeBooking failed with error ${returnData}`);
          returnData = JSON.parse(returnData);
        }
      } catch (e) {
        //C2 call threw
        const errorText =
          config?.aPI_C2_ReserveConsultantSlot_NoResultsMsg ||
          'An unexpected error occured fetching LDBMakeBooking, please retry';
        returnData = `{"errorCode": 991, "errorText": "${errorText}"}`;
        returnData = JSON.parse(returnData);
        console.error(`LDBMakeBooking failed with exception ${e}`);
      }
    } else {
      //recaptcha invalid
      const errorText =
        config?.aPI_C2_ReserveConsultantSlot_NoResultsMsg ||
        'An unexpected error occured fetching LDBMakeBooking, please retry';
      returnData = `{"errorCode": 992, "errorText": "${errorText}"}`;
      returnData = JSON.parse(returnData);
      console.error(
        `LDBMakeBooking failed with recaptcha error ${JSON.stringify(
          captchaValidation
        )}`
      );
    }
  } catch (error) {
    //recaptcha invalid exception error
    const errorText =
      config?.aPI_C2_ReserveConsultantSlot_NoResultsMsg ||
      'An unexpected error occured fetching LDBMakeBooking, please retry';
    returnData = `{"errorCode": 993, "errorText": "${errorText}"}`;
    returnData = JSON.parse(returnData);
    console.error(`LDBMakeBooking failed with recaptcha exception ${error}`);
    console.log(error);
  }

  return returnData;
}
