/* eslint-disable @typescript-eslint/no-explicit-any */
import { getC2Config } from './getC2Config';

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
export async function getLDBFirstAppointmentData(
  gmcNumber: string,
  serviceURL?: string,
  headerKey?: string
): Promise<any> {
  // preference is passed params, otherwise get from settings
  const config = !serviceURL && !headerKey ? await getC2Config() : null;
  const requestURL = `${serviceURL ?? config?.aPI_C2_FirstAppointment_BaseURL}`;
  const header = `${headerKey ?? config?.aPI_C2_FirstAppointment_Header}`;

  let firstAppointmentData: string = '';
  const body = `{"consultants" : ["${gmcNumber}"] }`;
  try {
    // very light cache on these requests they contain time sensitive data
    const res = await fetch(requestURL, {
      method: 'post',
      body: body,
      headers: {
        'content-type': 'application/json',
        securitytoken: `"${header}"`,
      },
      cache: 'force-cache',
      next: { revalidate: 10 },
    });
    if (res.ok) {
      const result = await res.json();
      if (result && result.availability && result.availability.length == 1) {
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
