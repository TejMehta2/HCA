import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import client from 'src/lib/sitecore-client';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import { generateSitecorePageMetadata } from 'lib/utility-functions/generateSitecorePageMetadata';

type RouteSearchParams = Record<string, string | string[] | undefined>;

type BookingConfirmationPageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
  }>;
  searchParams?: Promise<RouteSearchParams>;
};

export const dynamic = 'force-dynamic';

const BOOKING_CONFIRMATION_PATH = 'booking/confirmation/,-w-,';

const getSearchParam = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

export default async function BookingConfirmationPage({
  params,
  searchParams,
}: BookingConfirmationPageProps) {
  const [{ site, locale, path }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams ?? Promise.resolve<RouteSearchParams>({}),
  ]);

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

  (
    page.layout.sitecore.context as typeof page.layout.sitecore.context & {
      bookingConfirmation?: {
        orderId?: string;
        transactionId?: string;
      };
    }
  ).bookingConfirmation = {
    orderId: path?.toString(),
    transactionId: getSearchParam(resolvedSearchParams.transaction_id),
  };

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
  const { path, site, locale } = await params;
  const page = await client.getPage(BOOKING_CONFIRMATION_PATH, {
    site,
    locale,
  });

  return generateSitecorePageMetadata({ page, site, path });
};
