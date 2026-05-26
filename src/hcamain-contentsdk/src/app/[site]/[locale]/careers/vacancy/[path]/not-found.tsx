import Link from 'next/link';
import { getCachedPageParams } from '@sitecore-content-sdk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

const NOT_FOUND_PATH = '/careers/vacancy/404';

export default async function NotFound() {
  const { site, locale } = getCachedPageParams();

  const page = await client.getPage(NOT_FOUND_PATH, {
    site: site || scConfig.defaultSite,
    locale: locale || scConfig.defaultLanguage,
  });

  if (page?.layout.sitecore.route) {
    return (
      <NextIntlClientProvider>       
          <Providers page={page}>
            <Layout page={page} />
          </Providers>        
      </NextIntlClientProvider>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Vacancy not found</h1>      
      <Link href="/finder">Go to the Home page</Link>
    </div>
  );
}