process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const jssConfig = require('./src/temp/config');
const plugins = require('./src/temp/next-config-plugins') || {};

const publicUrl = jssConfig.publicUrl;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
        destination: '/api/api-layer/api/paymentForm/:path*',
        
      }
    ];
  },

    async redirects() {
      return [
        {
          //About-hca-uk redirect
          source: '/about-hca-uk/staff-stories', 
            destination: '/careers/staff-stories',
            permanent: true
          },
    
    
          {
          //our-services/conditions
           source: '/our-services/conditions/:path*', 
            destination: '/conditions/:path*',
            permanent: true
          },
    
          {
            //our-services/specialties
             source: '/our-services/specialties/:path*', 
              destination: '/services/departments/:path*',
              permanent: true
            },
    
            {
              //our-services/cancer-care
               source: '/our-services/specialties/cancer-care-network/:path*', 
                destination: '/services/departments/cancer-care/:path*',
                permanent: true
              },
    
              {
                ///our-services/specialties/cardiac-care
                 source: '/our-services/specialties/cardiac-care/:path*', 
                  destination: '/services/departments/cardiac/:path*',
                  permanent: true
                },
    
                {
                  ////our-services/specialties/maternity-care
                   source: '/our-services/specialties/maternity-care/:path*', 
                    destination: '/services/departments/maternity-and-obstetrics/:path*',
                    permanent: true
                  },
    
    
                  {
                    ///our-services/specialties/orthopaedic-care
                     source: '/our-services/specialties/orthopaedic-care/:path*', 
                      destination: '/services/departments/orthopaedics/:path*',
                      permanent: true
                    },
    
                    {
                      ///our-services/therapies
                       source: '/our-services/supportive-services/:path*', 
                        destination: '/services/gp-and-urgent-care/gp-services/physiotherapy/:path*',
                        permanent: true
                      },
    
                      {
                        ///our-services/tests
                         source: '/our-services/tests/:path*', 
                          destination: '/tests-and-scans/:path*',
                          permanent: true
                        },
    
                        
                        {
                          ///our-services/treatments/
                           source: '/our-services/tests/:path*', 
                            destination: '/treatments/:path*',
                            permanent: true
                          },
    
    
                          {
                            ///blogs
                             source: '/blogs/:path*', 
                              destination: '/blog/:path*',
                              permanent: true
                            },
                            {
                              ///finder
                               source: '/finder/:path*', 
                                destination: '/find-a-doctor/:path*',
                                permanent: true
                              },
                              {
                                ////finder/enquireform
                                 source: '/finder/enquireform/:path*', 
                                  destination: '/find-a-doctor/:path*',
                                  permanent: true
                                },
                                {
                                  ////finder/specialists
                                   source: '/finder/specialists/:path*', 
                                    destination: '/find-a-doctor/:path*',
                                    permanent: true
                                  },
                                  {
                                    ////finder/livebooking
                                     source: '/finder/livebooking/:path*', 
                                      destination: '/find-a-doctor/:path*',
                                      permanent: true
                                    },
                                    {
                                      ////for-patients-and-visitors/patient-stories
                                       source: '/for-patients-and-visitors/patient-stories/:path*', 
                                        destination: '/patient-and-visitor-information/patient-information/patient-stories/:path*',
                                        permanent: true
                                      },
      ]
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
    domains: ['upload.wikimedia.org', 'a.mktgcdn.com'],
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce(
    (acc, plugin) => plugin(acc),
    nextConfig
  );
};
