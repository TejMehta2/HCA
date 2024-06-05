import type { NextApiRequest, NextApiResponse } from 'next';
import { ILDBDemographics, LDBMakeBooking } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Make Booking API ability to call from the client side (internally without passing secrets)
const PostLDBMakeBooking = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  //console.log('req.body', req.body);
  const dateFrom = req.body?.dateFrom as string; // e.g. 2023-08-29T10:30:00
  const isFollowOnAppointment =
    req.body?.isFollowOnAppointment?.toString() === 'true' ? true : false; // true if follow up false if initial
  const demographics = req.body?.demographics as ILDBDemographics; //demographics as ILDBDemographics, // demographics of the patient
  const reasonForAppointment = req.body?.reasonForAppointment as string; // free format reason for the appointment
  const recaptcha = req.body?.recaptcha as string; // recaptcha result to server side verify
  const selectedSpeciality = req.body?.selectedSpeciality as string; // e.g. orthopaedics
  const ConsultantGUID = req.body?.ConsultantGUID as string; // or HCAConsultantId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  const LocationGUID = req.body?.LocationGUID as string; // or LocationId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  const HCAConsultantId = req.body?.HCAConsultantId as string; // or e.g. ConsultantGUID 4066576
  const FacilityId = req.body?.FacilityId as string; // or LocationGUID e.g.COCLB

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

  return res.status(200).json(response);
};

export default PostLDBMakeBooking;
