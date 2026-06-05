import type { Page } from '@sitecore-content-sdk/nextjs';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { notFound } from 'next/navigation';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import client from 'src/lib/sitecore-client';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import VacancySchema from 'components/core-components/VacancySchema';
import type {
  VacancyResponse,
  VacancyRoute,
} from 'components/Careers/JobDetailsHeader/JobDetailsHeader.types';
import { addThumbnailParameter } from 'lib/utility-functions/addThumbnailParameter';
import { getMetadataFields } from 'lib/sitecore/metadata';
import { PageRouteMetadata } from 'components/Page Content/Metadata/Metadata';
import {
  getPagePath,
  getSiteBaseUrl,
  toTwitterCard,
} from 'lib/utility-functions/urlUtils';
import { Metadata } from 'next';
import { cache } from 'react';

const VACANCY_WILDCARD_PATH = 'Careers/Vacancy/,-w-,';

type VacancyPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path: string;
  }>;
};

export const dynamic = 'force-dynamic';

const getVacancy = cache(
  async (path: string): Promise<VacancyResponse | null> => {
    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/job/${encodeURIComponent(path)}`,
      { cache: 'no-store' }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.log(
        `Vacancy request failed with status ${response.status}, path: ${path}`
      );
      return null;
    }

    const data = await response.json();
    return data.response;
  }
);

export default async function VacancyPage({ params }: VacancyPageProps) {
  const { site, locale, path } = await params;

  setRequestLocale(`${site}_${locale}`);

  const draft = await draftMode();

  let page: Page | null;
  if (draft.isEnabled) {
    const headers = await nextHeaders();
    const previewData = client.getPreviewData(headers);

    if (isDesignLibraryPreviewData(previewData)) {
      page = await client.getDesignLibraryData(previewData);
    } else {
      page = await client.getPreview(previewData);
    }
  } else {
    page = await client.getPage(VACANCY_WILDCARD_PATH, { site, locale });
  }

  if (!page?.layout.sitecore.route) {
    return notFound();
  }

  let vacancy: VacancyResponse | null = null;

  if (!page.mode.isEditing) {
    vacancy = await getVacancy(path);

    if (!vacancy) {
      return notFound();
    }

    (page.layout.sitecore.route as VacancyRoute).vacancy = vacancy;
  }

  return (
    <NextIntlClientProvider>    
      <Providers page={page}>
        <VacancySchema vacancy={vacancy} />
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

const replaceTokens = (
  template: string,
  tokens: Record<string, string | number | null | undefined>
) =>
  template
    .replace(
      /\{([a-zA-Z0-9_]+)\}/g,
      (_, tokenName: string) => tokens[tokenName]?.toString() || ''
    )
    .replace(/\s+/g, ' ')
    .trim();

// Metadata fields for the page.
export const generateMetadata = async ({
  params,
}: VacancyPageProps): Promise<Metadata> => {
  const { path, site, locale } = await params;
  const baseUrl = await getSiteBaseUrl(site);
  const metadataBase = baseUrl ? new URL(baseUrl) : undefined;

  // The same call as for rendering the page. Should be cached by default react behavior
  const page = await client.getPage(VACANCY_WILDCARD_PATH, { site, locale });

  const vacancy = await getVacancy(path);

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

  const vacancyTokens = {
    jobName: vacancy?.name,
    jobCity: vacancy?.jobCity,
    jobLocation: vacancy?.jobLocation,
    jobFamily: vacancy?.jobFamilyNameforJobProfile,
    employmentType: vacancy?.employmentType,
    pageTitleSuffix: PageTitleSufix?.value,
  };

  const {
    MetaDescription,
    MetaImage,
    NoFollow,
    NoIndex,
    AbstractImage,
    Image,
    CanonicalUrl,
    MetaTitle,
  } = fields;

  const title = MetaTitle?.value
    ? replaceTokens(MetaTitle?.value || '', vacancyTokens)
    : `${vacancy?.name} in ${vacancy?.jobCity} | ${vacancy?.jobLocation} ${PageTitleSufix?.value || ''}`.trim();

  const description = MetaDescription?.value
    ? replaceTokens(MetaDescription?.value || '', vacancyTokens)
    : `Apply for a ${vacancy?.employmentType.toLowerCase()} ${vacancy?.name} role at ${vacancy?.jobLocation}. Join our ${vacancy?.jobFamilyNameforJobProfile} team and develop your career with HCA UK.`.trim();

  const image =
    MetaImage?.value?.src ||
    AbstractImage?.value?.src ||
    Image?.value?.src ||
    DefaultMetaImage?.value?.src;

  const imageThumbnailUrl = image ? addThumbnailParameter(image) : undefined;
  const pagePath = getPagePath(
    page.layout.sitecore.context?.itemPath as string | undefined,
    [path]
  );
  const canonical = CanonicalUrl?.value?.href || pagePath;
  const twitterCard = toTwitterCard(TwitterCard?.value);

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
  };
};
