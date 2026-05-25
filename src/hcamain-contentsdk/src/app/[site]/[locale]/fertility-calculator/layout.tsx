import type { ReactNode } from 'react';

/* eslint-disable @next/next/no-css-tags */
export default function FertilityCalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <link
        href="../static/legacy/fertility-calc/style/site-main.css"
        rel="stylesheet"
      />
      <link
        href="../static/legacy/fertility-calc/style/react-main.css"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
