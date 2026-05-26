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
