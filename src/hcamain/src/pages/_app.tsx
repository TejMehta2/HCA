import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import '@component-library/globals/index.scss';
import Themes from '@component-library/foundation/Themes/Themes';
import { Suspense } from 'react';

function App({
  Component,
  pageProps,
}: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.

    // Use suspense to squash pre-render errors in production environments
    <Suspense fallback={<></>}>
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Themes theme={'A-HCA-White'}>
          <Component {...rest} />
        </Themes>
      </I18nProvider>
    </Suspense>
  );
}

export default App;
