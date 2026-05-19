import { FINDER_PROFILE_ROOT_PATH } from 'lib/constants';
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
