// The BYOC bundle imports external (BYOC) components into the app and makes sure they are ready to be used
import BYOC from 'src/byoc';
import CdpPageView from 'components/CdpPageView';
import Script from 'next/script';

const Scripts = (): JSX.Element => {
  const gtmKey = process.env.GTM_KEY;
  return (
    <>
      <BYOC />
      <CdpPageView />
      <Script
        id="gtm-snippet"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', ${gtmKey});
            `,
        }}
      />
    </>
  );
};

export default Scripts;
