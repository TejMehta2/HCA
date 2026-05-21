import { FINDER_PROFILE_ROOT_PATH } from 'lib/constants';
import {
  getSpecialistProfileData,
  isErrorWithProfileData,
} from 'lib/consultant-finder/API_Doctify';
import { notFound } from 'next/navigation';
import { generateFinderMetadata, renderFinderPage } from '../../FinderPage';

type ConsultantProfilePageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path: string;
  }>;
};

export const dynamicParams = true;
export const revalidate = 300;

const PROFILE_WILDCARD_PATH = `${FINDER_PROFILE_ROOT_PATH}/,-w-,`;

export default async function ConsultantProfilePage({
  params,
}: ConsultantProfilePageProps) {
  const resolvedParams = await params;
  const consultantProfileJson = resolvedParams.path
    ? await getSpecialistProfileData(resolvedParams.path)
    : null;

  if (
    !consultantProfileJson ||
    isErrorWithProfileData(consultantProfileJson)
  ) {
    notFound();
  }

  return renderFinderPage(
    resolvedParams,
    PROFILE_WILDCARD_PATH,
    resolvedParams.path
  );
}

export const generateMetadata = async ({
  params,
}: ConsultantProfilePageProps) => {
  const resolvedParams = await params;
  return generateFinderMetadata(resolvedParams, PROFILE_WILDCARD_PATH);
};
