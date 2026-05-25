import type { ReactNode } from 'react';

/* eslint-disable @next/next/no-css-tags */
export default function IvfPricerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <link
        href="../static/legacy/ivf-pricer/style/site-main.css"
        rel="stylesheet"
      />
      <link
        href="../static/legacy/ivf-pricer/style/react-main.css"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
