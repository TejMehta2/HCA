import { NextRequest, NextResponse } from 'next/server';
import { ILDBDemographics, LDBMakeBooking } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Make Booking API ability to call from the client side (internally without passing secrets)
export async function POST(req: NextRequest) {
  //console.log('req.body', req.body);
  let body: any;
  try {
    body = await req.json();
  } catch {
    body = undefined;
  }
  const dateFrom = body?.dateFrom as string; // e.g. 2023-08-29T10:30:00
  const isFollowOnAppointment =
    body?.isFollowOnAppointment?.toString() === 'true' ? true : false; // true if follow up false if initial
  const demographics = body?.demographics as ILDBDemographics; //demographics as ILDBDemographics, // demographics of the patient
  const reasonForAppointment = body?.reasonForAppointment as string; // free format reason for the appointment
  const recaptcha = body?.recaptcha as string; // recaptcha result to server side verify
  const selectedSpeciality = body?.selectedSpeciality as string; // e.g. orthopaedics
  const ConsultantGUID = body?.ConsultantGUID as string; // or HCAConsultantId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  const LocationGUID = body?.LocationGUID as string; // or LocationId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  const HCAConsultantId = body?.HCAConsultantId as string; // or e.g. ConsultantGUID 4066576
  const FacilityId = body?.FacilityId as string; // or LocationGUID e.g.COCLB

  /*
  console.log(
    dateFrom,
    isFollowOnAppointment,
    demographics,
    reasonForAppointment,
    recaptcha,
    selectedSpeciality,
    ConsultantGUID,
    LocationGUID,
    HCAConsultantId,
    FacilityId
  );*/

  let response: unknown = '';

  if (
    dateFrom != undefined &&
    isFollowOnAppointment != undefined &&
    demographics != undefined &&
    reasonForAppointment != undefined &&
    recaptcha != undefined &&
    selectedSpeciality != undefined &&
    (ConsultantGUID != undefined || HCAConsultantId != undefined) &&
    (LocationGUID != undefined || FacilityId != undefined)
  ) {
    response = await LDBMakeBooking(
      dateFrom,
      isFollowOnAppointment,
      demographics,
      reasonForAppointment,
      recaptcha,
      selectedSpeciality,
      ConsultantGUID,
      LocationGUID,
      HCAConsultantId,
      FacilityId
    );
  } else {
    //PostLDBMakeBooking call failed
    const returnData = `{"errorCode": 998, "errorText": "missing parameters submitting the form"}`;
    response = JSON.parse(returnData);
    console.warn(`PostLDBMakeBooking missing form params`);
  }

  return NextResponse.json(response, { status: 200 });
}
