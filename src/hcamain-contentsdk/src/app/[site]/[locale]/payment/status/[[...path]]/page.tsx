import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import client from 'src/lib/sitecore-client';
import Layout, { RouteFields } from 'src/Layout';
import Providers from 'src/Providers';
import CustomTracking from 'components/core-components/CustomTracking';

type PaymentStatusPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
  }>;
};

export const dynamic = 'force-dynamic';

const PAYMENT_STATUS_PATH = 'payment/status/';

export default async function PaymentStatusPage({
  params,
}: PaymentStatusPageProps) {
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
    page = await client.getPage(PAYMENT_STATUS_PATH, { site, locale });
  }

  if (!page?.layout.sitecore.route) {
    notFound();
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

export const generateMetadata = async ({
  params,
}: PaymentStatusPageProps) => {
  const { site, locale } = await params;
  const page = await client.getPage(PAYMENT_STATUS_PATH, {
    site,
    locale,
  });

  return {
    title:
      (page?.layout.sitecore.route?.fields as RouteFields)?.Title?.value?.toString() ||
      'Page',
  };
};
