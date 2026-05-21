import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import client from 'src/lib/sitecore-client';
import Layout, { RouteFields } from 'src/Layout';
import Providers from 'src/Providers';

type BookingConfirmationPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
  }>;
};

export const dynamic = 'force-dynamic';

const BOOKING_CONFIRMATION_PATH = 'booking/confirmation/,-w-,';

export default async function BookingConfirmationPage({
  params,
}: BookingConfirmationPageProps) {
  const { site, locale } = await params;

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
    page = await client.getPage(BOOKING_CONFIRMATION_PATH, { site, locale });
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
}: BookingConfirmationPageProps) => {
  const { site, locale } = await params;
  const page = await client.getPage(BOOKING_CONFIRMATION_PATH, {
    site,
    locale,
  });

  return {
    title:
      (page?.layout.sitecore.route?.fields as RouteFields)?.Title?.value?.toString() ||
      'Page',
  };
};
