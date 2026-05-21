import { type JSX } from 'react';
import { type GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import {
  getActiveLiveDiaryConsultantSlugs,
  getDoctifyPhoneNumberConsultantSlugs,
  getIgnoreReviewsConsultantSlugs,
} from 'lib/consultant-finder/API_HCA';
import { getInsuranceData } from 'lib/consultant-finder/API_Doctify';
import {
  Default as StepConsultantCardsClient,
  type StepConsultantCardsProps,
  type StepConsultantCardsServerSideProps,
} from './StepConsultantCardsClient';

export const getComponentServerProps: GetComponentServerProps = async () => {
  const ignoreConsultantReviews = await getIgnoreReviewsConsultantSlugs();
  const insurers = await getInsuranceData();
  const consultantsSlugsLD = await getActiveLiveDiaryConsultantSlugs();
  const consultantsSlugsDoctifyPhone =
    await getDoctifyPhoneNumberConsultantSlugs();

  return {
    Insurers: insurers,
    LiveDiaryConsultantsSlugs: consultantsSlugsLD,
    DoctifyPhoneConsultantsSlugs: consultantsSlugsDoctifyPhone,
    NoReviewsConsultants: ignoreConsultantReviews,
  } satisfies StepConsultantCardsServerSideProps;
};

export const Default = ({
  rendering,
  params,
  fields,
}: StepConsultantCardsProps): JSX.Element => (
  <StepConsultantCardsClient
    rendering={rendering}
    params={params}
    fields={fields}
  />
);
