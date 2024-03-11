import type { NextApiRequest, NextApiResponse } from 'next';
import { ILDBDemographics, LDBMakeBooking } from 'lib/consultant-finder/API_C2';

// wrapper for C2 Make Booking API ability to call from the client side (internally without passing secrets)
const PostLDBMakeBooking = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const dateFrom = req.body?.dateFrom as string; // e.g. 2023-08-29T10:30:00
  const isFollowOnAppointment =
    req.body?.isFollowOnAppointment.toString() === 'true' ? true : false; // true if follow up false if initial
  const demographics = req.body?.demographics as ILDBDemographics; //demographics as ILDBDemographics, // demographics of the patient
  const reasonForAppointment = req.body?.reasonForAppointment as string; // free format reason for the appointment
  const selectedSpeciality = req.body?.selectedSpeciality as string; // e.g. orthopaedics
  const ConsultantGUID = req.body?.ConsultantGUID as string; // or HCAConsultantId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  const LocationGUID = req.body?.LocationGUID as string; // or LocationId e.g. dc5e4e01-6f55-ee11-be6f-6045bdd2c129
  const HCAConsultantId = req.body?.HCAConsultantId as string; // or e.g. ConsultantGUID 4066576
  const FacilityId = req.body?.FacilityId as string; // or LocationGUID e.g.COCLB

  console.log(
    dateFrom,
    isFollowOnAppointment,
    demographics,
    reasonForAppointment,
    selectedSpeciality,
    ConsultantGUID,
    LocationGUID,
    HCAConsultantId,
    FacilityId
  );

  const response = await LDBMakeBooking(
    dateFrom,
    isFollowOnAppointment,
    demographics,
    reasonForAppointment,
    selectedSpeciality,
    ConsultantGUID,
    LocationGUID,
    HCAConsultantId,
    FacilityId
  );

  return res.status(200).json(response);
};

export default PostLDBMakeBooking;
