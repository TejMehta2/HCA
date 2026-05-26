import { type JSX } from 'react';
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

async function GetConsultantsData(): Promise<StepConsultantCardsServerSideProps> {
  const [
    ignoreConsultantReviews,
    insurers,
    consultantsSlugsLD,
    consultantsSlugsDoctifyPhone,
  ] = await Promise.all([
    getIgnoreReviewsConsultantSlugs(),
    getInsuranceData(),
    getActiveLiveDiaryConsultantSlugs(),
    getDoctifyPhoneNumberConsultantSlugs(),
  ]);

  return {
    Insurers: insurers,
    LiveDiaryConsultantsSlugs: consultantsSlugsLD,
    DoctifyPhoneConsultantsSlugs: consultantsSlugsDoctifyPhone,
    NoReviewsConsultants: ignoreConsultantReviews,
  } satisfies StepConsultantCardsServerSideProps;
}

export default async function Default({
  rendering,
  params,
  fields,
}: StepConsultantCardsProps): Promise<JSX.Element> {
  const serverData = await GetConsultantsData();

  return (
    <StepConsultantCardsClient
      serverSideData={serverData}
      rendering={rendering}
      params={params}
      fields={fields}
    />
  );
}
