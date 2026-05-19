import {
  generateFinderMetadata,
  renderFinderPage,
  toFinderWildcardPath,
} from '../FinderPage';

type FinderPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
  }>;
};

export const dynamic = 'force-dynamic';

export default async function FinderPage({ params }: FinderPageProps) {
  const resolvedParams = await params;
  const pagePath = toFinderWildcardPath(resolvedParams.path);

  return renderFinderPage(resolvedParams, pagePath, resolvedParams.path);
}

export const generateMetadata = async ({ params }: FinderPageProps) => {
  const resolvedParams = await params;
  return generateFinderMetadata(
    resolvedParams,
    toFinderWildcardPath(resolvedParams.path)
  );
};
