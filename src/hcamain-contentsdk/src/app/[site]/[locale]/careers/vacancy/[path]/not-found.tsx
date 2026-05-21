import { Suspense } from 'react';
import Link from 'next/link';
import { ErrorPage, getCachedPageParams } from '@sitecore-content-sdk/nextjs';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import { NextIntlClientProvider } from 'next-intl';

export default async function NotFound() {
  const { site, locale } = getCachedPageParams();

  const page = await client.getErrorPage(ErrorPage.NotFound, {
    site: site || scConfig.defaultSite,
    locale: locale || scConfig.defaultLanguage,
  });

  if (page) {
    return (
      <NextIntlClientProvider>
        <Suspense fallback={null}>
          <Providers page={page}>
            <Layout page={page} />
          </Providers>
        </Suspense>
      </NextIntlClientProvider>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Vacancy not found</h1>
      <p>This vacancy does not exist.</p>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}
