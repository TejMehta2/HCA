import { type JSX } from 'react';
import { type GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import {
  checkIfConsultantIsNoReviews,
  checkIfConsultantIsDoctifyPhoneNumber,
  checkIfLiveBookingIsAvailable,
  getPhysicianStructuredData,
} from 'lib/consultant-finder/API_HCA';
import {
  getSpecialistProfileData,
  isErrorWithProfileData,
} from 'lib/consultant-finder/API_Doctify';
import {
  Default as StepConsultantProfileClient,
  type StepConsultantProfileProps,
  type StepConsultantProfileServerSideProps,
} from './StepConsultantProfileClient';
import { notFound } from 'next/navigation';

const getRouteParam = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value[0]?.toString() || '';
  }

  return value?.toString() || '';
};

const getEmptyProfileProps = (
  slug = ''
): StepConsultantProfileServerSideProps => ({
  Slug: slug,
  IsLiveDiaryConsultant: false,
  IgnoreReviewsConsultant: false,
  DoctifyPhoneNumberConsultant: false,
  ProfileJson: null,
  PhysicianStructuredDataJson: null,
  ErrorWithProfileData: true,
});

export const getComponentServerProps: GetComponentServerProps = async (
  _rendering,
  _layoutData,
  context
) => {
  const slug = getRouteParam(context?.params?.requestPath);

  if (!slug) {
    return getEmptyProfileProps();
  }

  const path = getRouteParam(context?.params?.path).replace(',-w-,', '');
  const consultantProfileJson = await getSpecialistProfileData(slug);
  const physicianStructuredDataJson = await getPhysicianStructuredData(
    slug,
    consultantProfileJson,
    path
  );
  const isLiveDiaryConsultant = await checkIfLiveBookingIsAvailable(slug);
  const ignoreReviewConsultant = await checkIfConsultantIsNoReviews(slug);
  const consultantIsDoctifyPhoneNumber =
    physicianStructuredDataJson?.mainEntity?.medicalSpecialty?.name ===
    'General Practice (GP)' ||
    (await checkIfConsultantIsDoctifyPhoneNumber(slug));

 const isProfileError = isErrorWithProfileData(consultantProfileJson);

  if(isProfileError || !consultantProfileJson)
    return notFound();

  return {
    Slug: slug,
    ErrorWithProfileData: isProfileError,
    IsLiveDiaryConsultant: isLiveDiaryConsultant,
    IgnoreReviewsConsultant: ignoreReviewConsultant,
    DoctifyPhoneNumberConsultant: consultantIsDoctifyPhoneNumber,
    ProfileJson: consultantProfileJson,
    PhysicianStructuredDataJson: physicianStructuredDataJson,
  } satisfies StepConsultantProfileServerSideProps;
};

export const Default = ({
  rendering,
  params,
  fields,
}: StepConsultantProfileProps): JSX.Element => (
  <StepConsultantProfileClient
    rendering={rendering}
    params={params}
    fields={fields}
  />
);
