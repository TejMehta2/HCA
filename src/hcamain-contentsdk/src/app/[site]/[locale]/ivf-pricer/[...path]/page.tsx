import type { Metadata } from 'next';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import client from 'src/lib/sitecore-client';
import Layout, { RouteFields } from 'src/Layout';
import Providers from 'src/Providers';
import { generateSitecorePageMetadata } from 'lib/utility-functions/generateSitecorePageMetadata';

type IvfPricerPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
  }>;
};

export const dynamic = 'force-dynamic';

const toIvfPricerPath = (path?: string[]) => `ivf-pricer/${path ?? ''}/`;

export default async function IvfPricerPage({ params }: IvfPricerPageProps) {
  const { site, locale, path } = await params;

  setRequestLocale(`${site}_${locale}`);

  const draft = await draftMode();
  let page;

  if (draft.isEnabled) {
    const headers = await nextHeaders();
    const previewData = client.getPreviewData(headers);

    if (isDesignLibraryPreviewData(previewData)) {
      page = await client.getDesignLibraryData(previewData);
    } else {
      page = await client.getPreview(previewData);
    }
  } else {
    page = await client.getPage(toIvfPricerPath(path), {
      site,
      locale,
    });
  }

  if (!page?.layout.sitecore.route) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <Providers page={page}>
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

export const generateMetadata = async ({
  params,
}: IvfPricerPageProps): Promise<Metadata> => {
  const { site, locale, path } = await params;
  const page = await client.getPage(toIvfPricerPath(path), {
    site,
    locale,
  });
 return generateSitecorePageMetadata({ page, site, path });
};
