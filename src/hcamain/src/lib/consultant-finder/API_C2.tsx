/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetC2Config } from './getC2Config';
import { sanitizeJSON } from './sanitizeJSON';

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
  headerKey?: string,
  queryString?: string // additonal query string
): Promise<any> {
  // preference is passed params, otherwise get from settings
  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  const requestURL = `${serviceURL ?? config?.aPI_C2_FirstAppointment_BaseURL}${queryString ? '?' + queryString : ''}`;
  const header = `${headerKey ?? config?.aPI_C2_FirstAppointment_Header}`;

  let returnData: any = '';
  let gmcArray: string[] = [];
  if (gmcNumber) {
    gmcArray = gmcArray.concat(gmcNumber);
  }

  if (gmcNumbers) {
    gmcArray = gmcArray.concat(gmcNumbers?.split(','));
    // new api doesn't allow empty gmcs
    if (config?.aPI_C2_UsingCSharpAPI) {
      gmcArray = gmcArray.filter(function (el) {
        return el != null && el != '';
      });
    }
  }

  const requestAll = gmcArray?.length == 0;
  const gmcArrayBody = requestAll
    ? ''
    : gmcArray?.map((gmc: any) => '"' + gmc).join('",') + '"';

  const body = `{"consultants" : [${gmcArrayBody}] }`;
  //console.log('body', body);

  try {
    let res: any = '';
    if (config?.aPI_C2_UsingCSharpAPI) {
      //console.log('using C2 C# API');
      //console.log('requestURL', requestURL);
      //console.log('body', body);
      //'http://localhost:4000/api/Consultant/InitialAndFollowUpAppointments',
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'post',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'X-WebApi-Key': `${header}`,
        },
        next: {
          revalidate: 60,
        },
      });
      //console.log('done request');
    } else {
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'post',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          securitytoken: `"${header}"`,
        },
        next: {
          revalidate: 60,
        },
      });
    }

    if (res.ok) {
      const result = await res.json();
      // console.log('result', result);

      if (result && result.availability) {
        //console.log("result.availability", result.availability);
        result.availability.forEach(
          (retRecord: { refreshdate: string; refreshedText: string }) => {
            calcMinutesSinceUpdate(retRecord);
          }
        );
      }
      //console.log('retRecord', result);
      if (config?.aPI_C2_UsingCSharpAPI) {
        if (requestAll) {
          returnData = result.availability as object[];
        } else {
          // remap in the correct order and provide null for entries where no info was found
          returnData = gmcArray.map((gmc: any) =>
            (result.availability as object[]).find(
              (rec: any) => rec.professionalRegistrationNumber == gmc
            )
          );
        }
      } else {
        // remap in the correct order and provide null for entries where no info was found
        returnData = gmcArray.map((gmc: any) =>
          (result.availability as object[]).find((rec: any) => rec.gmc == gmc)
        );
      }
      //console.log('returnData', returnData);
    } else {
      //C2 call failed
      if (config?.aPI_C2_UsingCSharpAPI) {
        const errorResult = await res.json();
        //console.log('requestURL', requestURL);
        //console.log('body', body);
        //console.log('res', errorResult);
        returnData = `{"errorCode": ${res.status}, "errorText": "${errorResult?.message}"}`;
        returnData = JSON.parse(returnData);
        console.error(
          `getLDBFirstAppointmentData failed with error ${JSON.stringify(
            returnData
          )}`
        );
      } else {
        returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}"}`;
        returnData = JSON.parse(returnData);
        console.error(
          `getLDBFirstAppointmentData failed with error ${JSON.stringify(
            returnData
          )}`
        );
      }
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
  headerKey?: string,
  queryString?: string // additonal query string
): Promise<any> {
  // preference is passed params, otherwise get from settings
  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  const requestURL = `${serviceURL ?? config?.aPI_C2_FirstAppointment_BaseURL}${queryString ? '?' + queryString : ''}`;
  const header = `${headerKey ?? config?.aPI_C2_FirstAppointment_Header}`;

  let returnData: string = '';
  const body = `{"consultants" : ["${gmcNumber}"] }`;
  try {
    let res: any = '';
    if (config?.aPI_C2_UsingCSharpAPI) {
      //console.log('using C2 C# API');
      //console.log('requestURL', requestURL);
      //console.log('body', body);
      //'http://localhost:4000/api/Consultant/InitialAndFollowUpAppointments',
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'post',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'X-WebApi-Key': `${header}`,
        },
        next: {
          revalidate: 60,
        },
      });
      //console.log('done request');
    } else {
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'post',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          securitytoken: `"${header}"`,
        },
        next: {
          revalidate: 60,
        },
      });
    }

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
  }${
    config?.aPI_C2_UsingCSharpAPI ? '?' : '&'
  }HCAConsultantId=${GMCNumber}&${followOnFrag}`;
  const header = `${headerKey ?? config?.aPI_C2_GetConsultantDetails_Header}`;

  let returnData: any = '';

  try {
    let res: any = '';
    if (config?.aPI_C2_UsingCSharpAPI) {
      //console.log('using C2 C# API');
      //console.log('requestURL', requestURL);
      //console.log('body', body);
      //'http://localhost:4000/api/Consultant/InitialAndFollowUpAppointments',
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-WebApi-Key': `${header}`,
        },
        next: {
          revalidate: 60,
        },
      });
      //console.log('res', JSON.stringify(res));
      //console.log('done request');
    } else {
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          securitytoken: `"${header}"`,
        },
        next: {
          revalidate: 60,
        },
      });
    }

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
      if (config?.aPI_C2_UsingCSharpAPI) {
        const errorResult = await res.json();
        //console.log('requestURL', requestURL);
        //console.log('body', body);
        //console.log('res', errorResult);
        returnData = `{"errorCode": ${res.status}, "errorText": "${errorResult?.message}"}`;
        returnData = JSON.parse(returnData);
        console.error(
          `getLDBConsultantDetails failed with error ${JSON.stringify(
            returnData
          )}`
        );
      } else {
        returnData = `{"errorCode": ${res.status}, "errorText": "${res.statusText}"}`;
        returnData = JSON.parse(returnData);
        console.error(
          `getLDBConsultantDetails failed with error ${JSON.stringify(
            returnData
          )}`
        );
      }
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
  }${
    config?.aPI_C2_UsingCSharpAPI ? '?' : '&'
  }${fragConsultant}&${fragLocation}&DateFrom=${DateFrom}&DateTo=${DateTo}&${followOnFrag}`;
  const header = `${headerKey ?? config?.aPI_C2_GetConsultantSlots_Header}`;

  let returnData: string = '';

  try {
    let res: any = '';
    if (config?.aPI_C2_UsingCSharpAPI) {
      //console.log('using C2 C# API');
      //console.log('requestURL', requestURL);
      //console.log('body', body);
      //'http://localhost:4000/api/Consultant/InitialAndFollowUpAppointments',
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-WebApi-Key': `${header}`,
        },
        next: {
          revalidate: 60,
        },
      });
      //console.log('done request');
    } else {
      // very light cache on these requests they contain time sensitive data
      res = await fetch(requestURL, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          securitytoken: `"${header}"`,
        },
        next: {
          revalidate: 60,
        },
      });
    }

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
        ? `"initialappointment": ${
            config?.aPI_C2_UsingCSharpAPI ? '"no"' : null
          }, "followonappointment": "yes"`
        : `"initialappointment": "yes", "followonappointment":  ${
            config?.aPI_C2_UsingCSharpAPI ? '"no"' : null
          }`;
      const fragConsultant = ConsultantGUID
        ? `"ConsultantGUID": "${ConsultantGUID}"`
        : `"HCAConsultantId": "${HCAConsultantId}"`;
      const fragLocation = LocationGUID
        ? `"LocationGUID": "${LocationGUID}"`
        : `"FacilityId": "${FacilityId}"`;
      const fragMedSec =
        demographics.bookingBy === 'medicalsecretary'
          ? `"medicalsecretary": true`
          : `"medicalsecretary": false`;
      const requestURL = `${
        serviceURL ?? config?.aPI_C2_ReserveConsultantSlot_BaseURL
      }`;
      const header = `${
        headerKey ?? config?.aPI_C2_ReserveConsultantSlot_Header
      }`;

      if (config?.aPI_C2_UsingCSharpAPI) {
        // bug where selectedSpeciality is expected in demographics
        demographics.selectedSpeciality = selectedSpeciality;
      }
      let demographicsString = JSON.stringify(demographics).substring(1);
      demographicsString =
        '{' +
        demographicsString.substring(0, demographicsString.length - 1) +
        '}';

      const body = `{
        ${fragConsultant},
        ${fragMedSec},
        ${fragLocation},
        "dateFrom": "${dateFrom}",
        ${fragFollowOn},
        "patientCode": "${
          demographics?.patientCode ? demographics?.patientCode : ''
        }",
        "demographics": ${demographicsString},
        "visitReasonDetails": {
            "selectedSpeciality": "${selectedSpeciality}",
            "reasonForAppointment": "${sanitizeJSON(reasonForAppointment)}"
        }
      }`;
      //console.log('booking json:', body);
      try {
        let res: any = '';
        if (config?.aPI_C2_UsingCSharpAPI) {
          //console.log('using C2 C# API');
          //console.log('requestURL', requestURL);
          //console.log('body', body);
          //'http://localhost:4000/api/Consultant/InitialAndFollowUpAppointments',
          // very light cache on these requests they contain time sensitive data
          res = await fetch(requestURL, {
            method: 'post',
            body: body,
            headers: {
              'Content-Type': 'application/json',
              'X-WebApi-Key': `${header}`,
            },
            cache: 'no-cache',
          });
          //console.log('done request');
        } else {
          // very light cache on these requests they contain time sensitive data
          res = await fetch(requestURL, {
            method: 'post',
            body: body,
            headers: {
              'Content-Type': 'application/json',
              securitytoken: `"${header}"`,
            },
            cache: 'no-cache',
          });
        }

        if (res.ok) {
          returnData = await res.json();
        } else {
          //C2 call failed
          let errorDetails = '';
          try {
            errorDetails = await res.text();
          } finally {
          }
          returnData = `{"errorCode": ${res.status}, "errorText": "${
            res.statusText
          }", "errorDetail": "${sanitizeJSON(errorDetails)}"}`;
          //enhance logging - https://hcauk-digital.atlassian.net/browse/HED-1601
          console.warn(
            `LDBMakeBooking c:${fragConsultant}, l:${fragLocation}, d:${dateFrom}, t:${fragFollowOn} s:${selectedSpeciality} r:${sanitizeJSON(
              reasonForAppointment
            )} failed with error ${returnData}`
          );
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

export interface IFinderEnquiryFields {
  practice: string; // "Golders Green Outpatients and Diagnostics Centre",
  dateAppointment: string; // "Within 100 week",
  timeAppointment: string; // "Afternoon",
  previousPatient: string; // "Yes",
  title: string; // "Mr",
  firstName: string; // "ZZZTEST_MATT",
  lastName: string; // "ZZZTEST_HOPKINS",
  gender: string; // "Male",
  date: string; // "2000-01-01",
  userPhone: string; // "07788999000",
  userEmail: string; // "test@ignore.domain",
  insurance: string; // "CS Healthcare",
  insuranceNumber: string; // "INS0987654321",
  reasonVisit: string; // "TESTING THE FORM PLEASE IGNORE",
  recaptcha: string; // "Can ignore/don’t need to store format is long string e.g.03AFcWeA48YI466Mx0YoBsmqYBcE-b5Hodyn-VyHqt1HYbKeXbCxhtba1HxDH2TF9LnizAxxMc0_WheDYb8gODux5A0e7naWbh_UDu3HDq1Y9u-h_MP2PHvN9d8x_lvFE68jywnpd71mf8bCUooOjxnvTOWNhd3h634PFLsZqNCFAXjhEMwloTGiwYSCspK-r7ecxTKU8SXj0HG2oBBKIOvOCeVJlKFRORvoEAPBTM_IPiw87YjVKCPyc8NfPLyM8KCdhAtjvEy8NRv7Bgs0c2n9adLKbpSjvGoXP7mD28Fv9E3EN0-fYipSFXgPgqDETBuAYbZyw4L8G_kfzFeL5PJ5dWzw4O5HrdS9cb5AyiPaG6rJVWwHKQCG0eROo2yMXSTWPLIWGFdAvL5quxH7pZ7vRoP700XUwusZsP1VCtmYA45EgWOx4zRgWcj1PaExyp6dNuH6U-T98uQ5QbYrsZwN1jP-ddQd2Q3G_Rs5gtGKzQ_xJnuH6w4w1kxxFFauJwzZtnQBNysSXl6ChvYLy2Fqw6nLcN2PTWEgBVkmrupfzEVAzXMMraVMG7swZuv5J9p9DB9diSWncGRoyBxOkfqdSEANeRmNxPJ42denWxzzHoaJ6sHPsc7nD8ypXZfToKE4-LXhfRy4EBcKDyoSTP88Z6NSjXyo83tSlkhz-YykiW7Kln9MygtCs",
  email: string; // true
  sms: boolean; //true
  phone: boolean; // true,
  post: boolean; // false,
  dateOfBirthFormatted: string; // "01-01-2000",
  consultantName: string; //  "Andrew Goldberg",
  consultantTopSpecialty: string; // "Orthopaedic Surgery",
  hiddenFormInstance: string; // "37bf88-ce54-dfa8-572c-5315bd5a8b58"
}

/*
This endpoint will create a diary enquiry in the CRM for the Consultant in a Pending state.  
The diary enquirywill also be placed on the Booking Queue so it can be actioned by the team.  
The Pending state reflects that the diary enquiry needs to be processed to Meditech by one of the team members.  
The Team members will pick a diary enquiry off the Queue and once processed will 
update the status to a relevant status e.g. Confirmed or Cancelled.  
*/
export async function FinderMakeEnquiry(
  fields: IFinderEnquiryFields,
  serviceURL?: string,
  headerKey?: string
): Promise<any> {
  let returnData: string = '';
  let okayToSend: boolean = true;

  const config = !serviceURL && !headerKey ? await GetC2Config() : null;
  //console.log('config', JSON.stringify(config));
  // first, validate reCapture
  try {
    let captchaValidation = null;
    /*console.log(
      'process.env.RECAPTCHA_SECRET_KEY',
      process.env.RECAPTCHA_SECRET_KEY
    );
    console.log('fields.recaptcha', fields.recaptcha);*/
    if (process.env.RECAPTCHA_SECRET_KEY) {
      // if the private key is set then validate server side
      // Ping the google recaptcha verify API to verify the captcha code you received
      //console.log(
      //  'validate url',
      //  `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
      //);
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${fields.recaptcha}`,
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
      try {
        const requestURL = `${
          serviceURL ?? config?.aPI_C2_BookingEnquiry_BaseURL
        }`;
        //console.log('requestURL', requestURL);
        const header = `${headerKey ?? config?.aPI_C2_BookingEnquiry_Header}`;
        //console.log('header', header);

        let res: any = '';
        if (config?.aPI_C2_UsingCSharpAPI) {
          //console.log('using C2 C# API');
          //console.log('requestURL', requestURL);
          //console.log('body', body);
          //'http://localhost:4000/api/Consultant/InitialAndFollowUpAppointments',
          // very light cache on these requests they contain time sensitive data
          res = await fetch(requestURL, {
            method: 'post',
            body: JSON.stringify(fields),
            headers: {
              'Content-Type': 'application/json',
              'X-WebApi-Key': `${header}`,
            },
            cache: 'no-cache',
          });
          //console.log('done request');
        } else {
          // very light cache on these requests they contain time sensitive data
          res = await fetch(requestURL, {
            method: 'post',
            body: JSON.stringify(fields),
            headers: {
              'Content-Type': 'application/json',
              securitytoken: `"${header}"`,
            },
            cache: 'no-cache',
          });
        }

        if (res.ok) {
          returnData = await res.text();
        } else {
          //C2 call failed
          let errorDetails = '';
          try {
            errorDetails = await res.text();
          } finally {
          }
          returnData = `{"errorCode": ${res.status}, "errorText": "${
            res.statusText
          }", "errorDetail": "${sanitizeJSON(errorDetails)}"}`;
          console.warn(`FinderMakeEnquiry failed with error ${returnData}`);
          returnData = JSON.parse(returnData);
        }
      } catch (e) {
        //C2 call threw
        const errorText =
          config?.aPI_C2_BookingEnquiry_NoResultsMsg ||
          'An unexpected error occured fetching FinderMakeEnquiry, please retry';
        returnData = `{"errorCode": 991, "errorText": "${errorText}"}`;
        returnData = JSON.parse(returnData);
        console.error(`FinderMakeEnquiry failed with exception ${e}`);
      }
    } else {
      //recaptcha invalid
      const errorText =
        config?.aPI_C2_BookingEnquiry_NoResultsMsg ||
        'An unexpected error occured fetching FinderMakeEnquiry, please retry';
      returnData = `{"errorCode": 992, "errorText": "${errorText}"}`;
      returnData = JSON.parse(returnData);
      console.error(
        `FinderMakeEnquiry failed with recaptcha error ${JSON.stringify(
          captchaValidation
        )}`
      );
    }
  } catch (error) {
    //recaptcha invalid exception error
    const errorText =
      config?.aPI_C2_BookingEnquiry_NoResultsMsg ||
      'An unexpected error occured fetching FinderMakeEnquiry, please retry';
    returnData = `{"errorCode": 993, "errorText": "${errorText}"}`;
    returnData = JSON.parse(returnData);
    console.error(`FinderMakeEnquiry failed with recaptcha exception ${error}`);
    console.log(error);
  }

  return returnData;
}
