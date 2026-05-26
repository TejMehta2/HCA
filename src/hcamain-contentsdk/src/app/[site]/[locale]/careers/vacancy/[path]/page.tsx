import type { Page } from '@sitecore-content-sdk/nextjs';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { notFound } from 'next/navigation';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import client from 'src/lib/sitecore-client';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import CustomTracking from 'components/core-components/CustomTracking';
import type {
  VacancyResponse,
  VacancyRoute,
} from 'components/Careers/JobDetailsHeader/JobDetailsHeader.types';

const VACANCY_WILDCARD_PATH = 'Careers/Vacancy/,-w-,';

type VacancyPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path: string;
  }>;
};

export const dynamic = 'force-dynamic';

async function getVacancy(path: string): Promise<VacancyResponse | null> {
  const response = await fetch(
    `${process.env.INTEGRATION_LAYER_URL}/careers/job/${encodeURIComponent(path)}`,
    { cache: 'no-store' }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    console.log(`Vacancy request failed with status ${response.status}, path: ${path}`);
    return null;     
  }

  const data = await response.json();
  return data.response;
}

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

  if (!page.mode.isEditing) {
    const vacancy = await getVacancy(path);

    if (!vacancy) {
      return notFound();
    }

    (page.layout.sitecore.route as VacancyRoute).vacancy = vacancy;
  }

  return (
    <NextIntlClientProvider>
      <CustomTracking />
      <Providers page={page}>
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}
