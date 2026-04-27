process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const jssConfig = require('./src/temp/config');
const plugins = require('./src/temp/next-config-plugins') || {};

const publicUrl = jssConfig.publicUrl;

const cspHeaderKey = process.env.CSP_Report_Only === 'true' ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
const cspHeader = `
    object-src none;
    frame-ancestors 'self' *.sitecorecloud.io
`
  // Replace newline characters and spaces
  const cspHeaderSingleLineValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

const securityHeaders = [
  {
    key: cspHeaderKey,
    value: cspHeaderSingleLineValue              
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // https://nextjs.org/docs/messages/static-page-generation-timeout
  // time in seconds, default 60
  staticPageGenerationTimeout: 120,
  // Disable "X-Powered-By: Next.js" Response header
  poweredByHeader: false,

  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en','ar-AE'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: jssConfig.defaultLanguage,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
      /*    MH Add back if IL wildcard is added   //don't rewrite lookup api to the integration layer
      {
        source: '/api/lookupAPI/:app*',
        destination: '/api/lookupAPI/:app*',
      },
      //don't rewrite forms proxy api to the integration layer
      {
        source: '/api/formAPI/:app*',
        destination: '/api/formAPI/:app*',
      },
      //don't rewrite location proxy api to the integration layer
      {
        source: '/api/locationAPI/:app*',
        destination: '/api/locationAPI/:app*',
      }, */
      // rewrite webhooks to integration layer proxy API route
      {
        source: '/webhooks/sitecore/:path*',
        destination: `/api/api-layer/webhooks/sitecore/:path*`,
      },
      // rewrite forms to integration layer proxy API route
      {
        source: '/api/sitecore/:path*',
        destination: `/api/api-layer/api/sitecore/:path*`,
      },
      // rewrite mail to integration layer proxy API route
      {
        source: '/referrer/mail/:path*',
        destination: `/api/api-layer/referrer/mail/:path*`,
      },
      // consultant finder sitemap
      {
        source: '/sitemap.hca.consultant-finder.xml',
        destination: `/api/api-layer/sitemap/consultants`,
      },
      {
        source: '/paymentForm/:path*',
        destination: '/api/payment/api/paymentForm/:path*',
      },
    ];
  },

  async redirects() {

    const SITECORE_SITE_NAME = process.env.SITECORE_SITE_NAME; 

    let redirects = [];

    if (SITECORE_SITE_NAME === "TheBirthCompany") {
      redirects = [
        { source: "/about-us.php", destination: "/about-us", permanent: true },
        { source: "/alderley-edge-clinic.php", destination: "/hale-facilities", permanent: true },  
        { source: "/anatomy-scan.php", destination: "/types-of-scans-available/pregnancy-scans/anatomy-scan", permanent: true },
        { source: "/articles.php", destination: "/articles", permanent: true },        
        { source: "/blood-tests.php", destination: "/types-of-scans-available/gynaecology-and-fertility-scans/blood-test", permanent: true },
        { source: "/booking-calendar.php", destination: "/booking", permanent: true },
        { source: "/bronze-package.php", destination: "/scan-packages/bronze-package", permanent: true },
        { source: "/cervical-scan.php", destination: "/types-of-scans-available/pregnancy-scans/cervical-scan", permanent: true },
        { source: "/check-screening-tests-available.php", destination: "/check-screening-tests-available", permanent: true },
        { source: "/cheshire.php", destination: "/hale-facilities", permanent: true },
        { source: "/comparing-internal-and-external-ultrasound-scans.php", destination: "/articles/comparing-internal-and-external-ultrasound-scans", permanent: true },
        { source: "/consultant-fees.php", destination: "/consultant-fees", permanent: true },
        { source: "/consultant-led-package.php", destination: "/midwife-packages/consultant-led-package", permanent: true },
        { source: "/contact.php", destination: "/contact-us", permanent: true },
        { source: "/deciding-whether-or-not-nipt-is-right-for-your-family.php", destination: "/types-of-scans-available/tests/deciding-whether-or-not-nipt-is-right-for-your-family", permanent: true },
        { source: "/disclaimer.php", destination: "/disclaimer", permanent: true },
        { source: "/does-a-transvaginal-ultrasound-hurt.php", destination: "/articles/does-a-transvaginal-ultrasound-hurt", permanent: true },
        { source: "/early-pregnancy-scan.php", destination: "/types-of-scans-available/pregnancy-scans/early-pregnancy-scan", permanent: true },
        { source: "/endometrial-lining-scan.php", destination: "/types-of-scans-available/gynaecology-and-fertility-scans/endometrial-lining-scan", permanent: true },
        { source: "/fees.php", destination: "/fees", permanent: true },
        { source: "/follicle-tracking-scan.php", destination: "/types-of-scans-available/gynaecology-and-fertility-scans/follicle-tracking-scan", permanent: true },
        { source: "/four-d-scan-hd.php", destination: "/types-of-scans-available/pregnancy-scans/four-d-scan-hd", permanent: true },
        { source: "/gold-package.php", destination: "/scan-packages/gold-package", permanent: true },
        { source: "/gynaecological-transvaginal-ultrasound-scan.php", destination: "/types-of-scans-available/gynaecology-and-fertility-scans/gynaecological-transvaginal-ultrasound-scan", permanent: true },
        { source: "/gynaecology-and-fertility-scans.php", destination: "/types-of-scans-available/gynaecology-and-fertility-scans", permanent: true },
        { source: "/iucd-location-scan.php", destination: "/types-of-scans-available/gynaecology-and-fertility-scans/iucd-location-scan", permanent: true },
        { source: "/london-facilities.php", destination: "/london-facilities", permanent: true },
        { source: "/midwife-appointment-request.php", destination: "/midwife-services/midwife-appointment-request", permanent: true },
        { source: "/midwife-faq.php", destination: "/midwife-services", permanent: true },
        { source: "/midwife-packages.php", destination: "/midwife-packages", permanent: true },
        { source: "/midwife-scan-package.php", destination: "/midwife-packages/midwife-scan-package", permanent: true },
        { source: "/midwife-services.php", destination: "/midwife-services", permanent: true },
        { source: "/nipt-landing-page.php", destination: "/types-of-scans-available/nipt/nipt", permanent: true },
        { source: "/nipt.php", destination: "/types-of-scans-available/nipt/nipt", permanent: true },
        { source: "/nuchal-scan.php", destination: "/types-of-scans-available/pregnancy-scans/nuchal-scan", permanent: true },
        { source: "/panorama-pre-natal-screen.php", destination: "/types-of-scans-available/nipt/panorama-pre-natal-screen", permanent: true },
        { source: "/pregnancy-calculator.php", destination: "/pregnancy-calculator", permanent: true },
        { source: "/pregnancy-scans.php", destination: "/types-of-scans-available/pregnancy-scans", permanent: true },
        { source: "/pregnancy-week-eight.php", destination: "/your-pregnancy-guide/pregnancy-week-eight", permanent: true },
        { source: "/pregnancy-week-eighteen.php", destination: "/your-pregnancy-guide/pregnancy-week-eighteen", permanent: true },
        { source: "/pregnancy-week-eleven.php", destination: "/your-pregnancy-guide/pregnancy-week-eleven", permanent: true },
        { source: "/pregnancy-week-fifteen.php", destination: "/your-pregnancy-guide/pregnancy-week-fifteen", permanent: true },
        { source: "/pregnancy-week-five.php", destination: "/your-pregnancy-guide/pregnancy-week-five", permanent: true },
        { source: "/pregnancy-week-forty.php", destination: "/your-pregnancy-guide/pregnancy-week-forty", permanent: true },
        { source: "/pregnancy-week-fourteen.php", destination: "/your-pregnancy-guide/pregnancy-week-fourteen", permanent: true },
        { source: "/pregnancy-week-nine.php", destination: "/your-pregnancy-guide/pregnancy-week-nine", permanent: true },
        { source: "/pregnancy-week-nineteen.php", destination: "/your-pregnancy-guide/pregnancy-week-nineteen", permanent: true },
        { source: "/pregnancy-week-seven.php", destination: "/your-pregnancy-guide/pregnancy-week-seven", permanent: true },
        { source: "/pregnancy-week-seventeen.php", destination: "/your-pregnancy-guide/pregnancy-week-seventeen", permanent: true },
        { source: "/pregnancy-week-six.php", destination: "/your-pregnancy-guide/pregnancy-week-six", permanent: true },
        { source: "/pregnancy-week-sixteen.php", destination: "/your-pregnancy-guide/pregnancy-week-sixteen", permanent: true },
        { source: "/pregnancy-week-ten.php", destination: "/your-pregnancy-guide/pregnancy-week-ten", permanent: true },
        { source: "/pregnancy-week-thirteen.php", destination: "/your-pregnancy-guide/pregnancy-week-thirteen", permanent: true },
        { source: "/pregnancy-week-thirty-eight.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-eight", permanent: true },
        { source: "/pregnancy-week-thirty-five.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-five", permanent: true },
        { source: "/pregnancy-week-thirty-four.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-four", permanent: true },
        { source: "/pregnancy-week-thirty-nine.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-nine", permanent: true },
        { source: "/pregnancy-week-thirty-one.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-one", permanent: true },
        { source: "/pregnancy-week-thirty-seven.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-seven", permanent: true },
        { source: "/pregnancy-week-thirty-six.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-six", permanent: true },
        { source: "/pregnancy-week-thirty-three.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-three", permanent: true },
        { source: "/pregnancy-week-thirty-two.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty-two", permanent: true },
        { source: "/pregnancy-week-thirty.php", destination: "/your-pregnancy-guide/pregnancy-week-thirty", permanent: true },
        { source: "/pregnancy-week-twelve.php", destination: "/your-pregnancy-guide/pregnancy-week-twelve", permanent: true },
        { source: "/pregnancy-week-twenty-eight.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-eight", permanent: true },
        { source: "/pregnancy-week-twenty-five.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-five", permanent: true },
        { source: "/pregnancy-week-twenty-four.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-four", permanent: true },
        { source: "/pregnancy-week-twenty-nine.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-nine", permanent: true },
        { source: "/pregnancy-week-twenty-one.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-one", permanent: true },
        { source: "/pregnancy-week-twenty-seven.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-seven", permanent: true },
        { source: "/pregnancy-week-twenty-six.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-six", permanent: true },
        { source: "/pregnancy-week-twenty-three.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-three", permanent: true },
        { source: "/pregnancy-week-twenty-two.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty-two", permanent: true },
        { source: "/pregnancy-week-twenty.php", destination: "/your-pregnancy-guide/pregnancy-week-twenty", permanent: true },
        { source: "/privacy-policy.php", destination: "/privacy-policy", permanent: true },
        { source: "/private-midwife-antenatal-care.php", destination: "/midwife-services/private-midwife-antenatal-care", permanent: true },
        { source: "/private-midwife-consultation-sixteen-weeks.php", destination: "/midwife-services/private-midwife-consultation-sixteen-weeks", permanent: true },
        { source: "/private-midwife-consultation-ten-twelve-weeks.php", destination: "/midwife-services/private-midwife-consultation-ten-twelve-weeks", permanent: true },
        { source: "/private-midwife-consultation-thirty-thirtytwo-weeks.php", destination: "/midwife-services/private-midwife-consultation-thirtytwo-thirtyfour-weeks", permanent: true },
        { source: "/private-midwife-consultation-thirtyfour-thirtysix-weeks.php", destination: "/midwife-services/private-midwife-consultation-thirtyfour-thirtysix-weeks", permanent: true },
        { source: "/private-midwife-consultation-twentyfour-twentysix-weeks.php", destination: "/midwife-services/private-midwife-consultation-twentyfour-twentysix-weeks", permanent: true },
        { source: "/private-midwife-consultation-twentysix-twentyeight-weeks.php", destination: "/midwife-services/private-midwife-consultation-twentysix-twentyeight-weeks", permanent: true },
        { source: "/private-midwives-consultation-at-fourty-weeks-pregnant.php", destination: "/midwife-services/private-midwives-consultation-at-fourty-weeks-pregnant", permanent: true },
        { source: "/private-midwives-consultation-at-thirty-eight-weeks-pregnant.php", destination: "/midwife-services/private-midwives-consultation-at-thirty-eight-weeks-pregnant", permanent: true },
        { source: "/reassurance-scan.php", destination: "/types-of-scans-available/pregnancy-scans/reassurance-scan", permanent: true },
        { source: "/rhesus-negative-test.php", destination: "/rhesus-negative-test", permanent: true },
        { source: "/safe-test.php", destination: "/types-of-scans-available/nipt/safe-test", permanent: true },
        { source: "/scan-packages.php", destination: "/scan-packages", permanent: true },
        { source: "/sexing-scan.php", destination: "/types-of-scans-available/pregnancy-scans/sexing-scan", permanent: true },
        { source: "/tdl-veriSeq-v-by-illumina-non-invasive-prenatal-test.php", destination: "/types-of-scans-available/nipt/tdl-veriseq-v-by-illumina-non-invasive-prenatal-test", permanent: true },
        { source: "/terms-and-conditions.php", destination: "/terms-and-conditions", permanent: true },
        { source: "/transvaginal-ultrasound-scan-consent-form.php", destination: "/types-of-scans-available/gynaecology-and-fertility-scans/transvaginal-ultrasound-scan-consent-form", permanent: true },
        { source: "/ultrasound-scan-fees.php", destination: "/ultrasound-scan-fees", permanent: true },
        { source: "/week-by-week-guide-to-pregnancy-care-and-appointments.php", destination: "/midwife-services/week-by-week-guide-to-pregnancy-care-and-appointments", permanent: true },
        { source: "/wellbeing-scan.php", destination: "/types-of-scans-available/pregnancy-scans/wellbeing-scan", permanent: true },
        { source: "/your-pregnancy-guide.php", destination: "/your-pregnancy-guide", permanent: true },
        { source: "/midwife-led-package.php", destination: "/midwife-packages/midwife-led-package", permanent: true },
        { source: "/obstetrics-registration-form.php", destination: "/obstetrics-registration-form", permanent: true },
        { source: "/gynaecological-registration-form.php", destination: "/gynaecological-registration-form", permanent: true },
        { source: "/pathology-registration-form.php", destination: "/pathology-registration-form", permanent: true },
        { source: "/types-of-scans-available/nipt/safe-test", destination: "/types-of-scans-available/nipt/prenatalsafe-test", permanent: true },
        { source: "/:path*.php", destination: "/", permanent: true },
      ];
    } else if (SITECORE_SITE_NAME === "hcamain") {
      redirects = [
        {
          //our-services/conditions
          source: '/our-services/conditions/:path*',
          destination: '/conditions/:path*',
          permanent: true,
        },  
        {
          ///our-services/tests
          source: '/our-services/tests/:path*',
          destination: '/tests-and-scans/:path*',
          permanent: true,
        },  
        {
          ///our-services/treatments/
          source: '/our-services/treatments/:path*',
          destination: '/services/treatments/:path*',
          permanent: true,
        },  
        {
          ///blogs
          source: '/blogs/:path*',
          destination: '/blog/:path*',
          permanent: true,
        },  
        {
          ///patient-stories
          source: '/for-patients-and-visitors/patient-stories/:path*',
          destination:
            '/patient-and-visitor-information/patient-information/patient-stories/:path*',
          permanent: true,
        },  
        {
          //finder/enquireform
          source: '/finder/enquireform/:path*',
          destination: '/finder/stepconsultantprofile/:path*',
          permanent: true,
        },
        {
          //finder/specialists
          source: '/finder/specialists/:path*',
          destination: '/finder/stepconsultantprofile/:path*',
          permanent: true,
        },
        {
          //finder/livebooking
          source: '/finder/livebooking/:path*',
          destination: '/finder/stepconsultantprofile/:path*',
          permanent: true,
        },
        {
          ////for-patients-and-visitors/patient-stories
          source: '/for-patients-and-visitors/patient-stories/:path*',
          destination:
            '/patient-and-visitor-information/patient-information/patient-stories/:path*',
          permanent: true,
        },
      ];
    } 

    return redirects;
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  transpilePackages: ['@hca/component-library/*'],
  swcMinify: false,
  images: {
    domains: [
      'upload.wikimedia.org',
      'a.mktgcdn.com',
      'hcil-q-001.sitecorecontenthub.cloud',
      'hcil-p-001.sitecorecontenthub.cloud',
      'edge.sitecorecloud.io',
      'www.doctify.com',
      'doctify.com',
      'xm-dev.hcahealthcareqa.co.uk',
      'www.hcahealthcareqa.co.uk'
    ],
    unoptimized: process.env.IMAGES_UNOPTIMIZED === 'true',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce(
    (acc, plugin) => plugin(acc),
    nextConfig
  );
};
