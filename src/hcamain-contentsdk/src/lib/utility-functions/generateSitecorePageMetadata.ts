import type { Page } from '@sitecore-content-sdk/nextjs';
import type { Metadata } from 'next';
import { PageRouteMetadata } from 'components/Page Content/Metadata/Metadata';
import { getMetadataFields } from 'lib/sitecore/metadata';
import { addThumbnailParameter } from './addThumbnailParameter';
import { isSitecoreDateSet } from './isSitecoreDateSet';
import { getPagePath, getSiteBaseUrl, toTwitterCard } from './urlUtils';
import { removeTags } from '@component-library/utility-functions';

type GenerateSitecorePageMetadataArgs = {
  page?: Page | null;
  site: string;
  path?: string[];
};

export const generateSitecorePageMetadata = async ({
  page,
  site,
  path,
}: GenerateSitecorePageMetadataArgs): Promise<Metadata> => {
  const baseUrl = await getSiteBaseUrl(site);
  const metadataBase = baseUrl ? new URL(baseUrl) : undefined;

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
