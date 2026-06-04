import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { notFound } from 'next/navigation';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { SiteInfo } from '@sitecore-content-sdk/nextjs';
import type { Metadata } from 'next';
import sites from '.sitecore/sites.json';
import { routing } from 'src/i18n/routing';
import scConfig from 'sitecore.config';
import client from 'src/lib/sitecore-client';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import CustomTracking from 'components/core-components/CustomTracking';
import Schema from 'src/Schema';
import { getMetadataFields, getMetadataGtmKey } from 'lib/sitecore/metadata';
import GtmScript from 'components/core-components/GtmScript';
import { PageRouteMetadata } from 'components/Page Content/Metadata/Metadata';
import { addThumbnailParameter } from 'lib/utility-functions/addThumbnailParameter';
import { isSitecoreDateSet } from 'lib/utility-functions/isSitecoreDateSet';
import { getSiteBaseUrl } from 'lib/utility-functions/urlUtils';
import { removeTags } from '@component-library/utility-functions';

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
};

const getPagePath = (itemPath?: string, path?: string[]) => {
  if (itemPath) {
    return itemPath.startsWith('/') ? itemPath : `/${itemPath}`;
  }

  return path?.length ? `/${path.join('/')}` : '/';
};

const toTwitterCard = (card?: string) => {
  switch (card?.toLowerCase().replace(/\s+/g, '_')) {
    case 'summary_large_image':
      return 'summary_large_image';
    case 'summary':
      return 'summary';
    default:
      return undefined;
  }
};

export default async function Page({ params }: PageProps) {
  const { site, locale, path } = await params;

  // Set site and locale to be available in src/i18n/request.ts for fetching the dictionary
  setRequestLocale(`${site}_${locale}`);

  const draft = await draftMode();

  // Fetch the page data from Sitecore
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
    page = await client.getPage(path ?? [], { site, locale });
  }

  // If the page is not found, return a 404
  if (!page) {
    notFound();
  }

  const gtmKey =
    getMetadataGtmKey(page.layout) || process.env.NEXT_PUBLIC_GTM_KEY;

  return (
    <NextIntlClientProvider>
      <GtmScript gtmKey={gtmKey} />
      <CustomTracking />
      <Providers page={page}>
        <Schema layoutData={page.layout} />
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const generateStaticParams = async () => {
  if (process.env.NODE_ENV !== 'development' && scConfig.generateStaticPaths) {
    return await client.getAppRouterStaticParams(
      sites.map((site: SiteInfo) => site.name),
      routing.locales.slice()
    );
  }
  // Next.js 16 requires at least one result
  // Return a default param for the root page
  return [
    {
      site: sites[0]?.name || 'default',
      locale: routing.defaultLocale || scConfig.defaultLanguage,
      path: [],
    },
  ];
};
// Metadata fields for the page.
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { path, site, locale } = await params;
  const baseUrl = await getSiteBaseUrl(site);
  const metadataBase = baseUrl ? new URL(baseUrl) : undefined;

  // The same call as for rendering the page. Should be cached by default react behavior
  const page = await client.getPage(path ?? [], { site, locale });

  if (!page?.layout.sitecore.route) {
    return {
      metadataBase,
      title: 'Page',
    };
  }

  const route = page.layout.sitecore.route as PageRouteMetadata;
  const fields = route.fields;

  if (!fields) {
    return {
      metadataBase,
      title: route.displayName || 'Page',
    };
  }

  const metadataFields = getMetadataFields(page.layout);
  const { DefaultMetaImage, PageTitleSufix, TwitterCard } =
    metadataFields ?? {};

  const {
    Title,
    MetaDescription,
    MetaImage,
    MetaTitle,
    NoFollow,
    NoIndex,
    AbstractImage,
    AbstractTitle,
    AbstractText,
    Image,
    Text,
    Date,
    CanonicalUrl,
  } = fields;

  const titleStripped = removeTags(Title?.value);
  const abstractTitleStripped = removeTags(AbstractTitle?.value || '');
  const TextStripped = removeTags(Text?.value || '');
  const AbstractTextStripped = removeTags(AbstractText?.value || '');

  const title =
    `${MetaTitle?.value || abstractTitleStripped || titleStripped || route.displayName} ${
      PageTitleSufix?.value || ''
    }`.trim();
  const description =
    MetaDescription?.value || AbstractTextStripped || TextStripped || undefined;
  const image =
    MetaImage?.value?.src ||
    AbstractImage?.value?.src ||
    Image?.value?.src ||
    DefaultMetaImage?.value?.src;

  const imageThumbnailUrl = image ? addThumbnailParameter(image) : undefined;
  const pagePath = getPagePath(
    page.layout.sitecore.context?.itemPath as string | undefined,
    path
  );
  const canonical = CanonicalUrl?.value?.href || pagePath;
  const twitterCard = toTwitterCard(TwitterCard?.value);
  const other: NonNullable<Metadata['other']> = {};

  if (Date?.value && isSitecoreDateSet(Date.value)) {
    other['og:article:published_time'] = Date.value;
    other.publishedTime = Date.value;
  }

  return {
    metadataBase,
    title,
    description,
    robots: {
      follow: !NoFollow?.value,
      index: !NoIndex?.value,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: pagePath,
      type: 'website',
      images: imageThumbnailUrl ? [{ url: imageThumbnailUrl }] : undefined,            
    },
    twitter: twitterCard
      ? {
          card: twitterCard,
          title,
          description,
          images: imageThumbnailUrl ? [imageThumbnailUrl] : undefined,
        }
      : undefined,
    other: Object.keys(other).length ? other : undefined,
  };
};
