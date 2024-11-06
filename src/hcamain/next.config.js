process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const jssConfig = require('./src/temp/config');
const plugins = require('./src/temp/next-config-plugins') || {};

const publicUrl = jssConfig.publicUrl;

//const cspHeaderKey = process.env.NODE_ENV === 'development' ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
const cspHeaderKey = 'Content-Security-Policy-Report-Only';
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
    locales: ['en'],
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
    return [
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
