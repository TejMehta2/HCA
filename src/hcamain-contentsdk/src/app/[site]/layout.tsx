import { draftMode } from 'next/headers';
import type { Metadata } from 'next';
import Bootstrap from 'src/Bootstrap';
import FormInstanceUidObserver from 'components/core-components/FormInstanceUidObserver';

export const metadata: Metadata = {
  icons: {
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
    },
    icon: [
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#ffffff',
      },
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#00558c',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const { isEnabled } = await draftMode();

  return (
    <>
      <Bootstrap siteName={site} isPreviewMode={isEnabled} />
      <FormInstanceUidObserver />
      {children}
    </>
  );
}
