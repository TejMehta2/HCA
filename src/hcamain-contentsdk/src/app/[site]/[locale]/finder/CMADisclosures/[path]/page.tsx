import { generateFinderMetadata, renderFinderPage } from '../../FinderPage';

type CMADisclosuresPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path: string;
  }>;
};

export const dynamicParams = true;
export const revalidate = 300;

const CMA_DISCLOSURES_WILDCARD_PATH = 'Finder/CMADisclosures/,-w-,';

export default async function CMADisclosuresPage({
  params,
}: CMADisclosuresPageProps) {
  const resolvedParams = await params;
  return renderFinderPage(
    resolvedParams,
    CMA_DISCLOSURES_WILDCARD_PATH,
    resolvedParams.path,
    {
      consultantSlug: resolvedParams.path,
    }
  );
}

export const generateMetadata = async ({
  params,
}: CMADisclosuresPageProps) => {
  const resolvedParams = await params;
  return generateFinderMetadata(resolvedParams, CMA_DISCLOSURES_WILDCARD_PATH);
};