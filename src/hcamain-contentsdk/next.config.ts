import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const svgrLoader = require.resolve('@svgr/webpack');

const nextConfig: NextConfig = {
  // Enable Turbopack file system caching for faster dev startup (beta)
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [svgrLoader],
        as: '*.js',
      },
    },
  },

  // use this configuration to ensure that only images from the whitelisted domains
  // can be served from the Next.js Image Optimization API
  // see https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edge*.**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'xmc-*.**',
        port: '',
      },
    ],
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
  // use this configuration to serve the sitemap.xml and robots.txt files from the API route handlers
  rewrites: async () => {
    return [
      {
        source: '/sitemap:id([\\w-]{0,}).xml',
        destination: '/api/sitemap',
        locale: false,
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
        locale: false,
      },
    ];
  },
  webpack: (config) => {
    const assetRule = config.module.rules.find(
      (rule: { test?: { test?: (value: string) => boolean } }) =>
        rule.test?.test?.('.svg')
    );

    if (assetRule) {
      assetRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [svgrLoader],
    });

    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
