import { generateFinderMetadata, renderFinderPage } from '../../FinderPage';

type SpecialistPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path: string;
  }>;
};

export const dynamicParams = true;
export const revalidate = 300;

const SPECIALISTS_WILDCARD_PATH = 'finder/specialists/,-w-,';

export default async function SpecialistPage({ params }: SpecialistPageProps) {
  const resolvedParams = await params;
  return renderFinderPage(
    resolvedParams,
    SPECIALISTS_WILDCARD_PATH,
    resolvedParams.path
  );
}

export const generateMetadata = async ({ params }: SpecialistPageProps) => {
  const resolvedParams = await params;
  return generateFinderMetadata(resolvedParams, SPECIALISTS_WILDCARD_PATH);
};
