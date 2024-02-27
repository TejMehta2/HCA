/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  LayoutServiceData,
  Field,
  HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';

import ScrollTransition from '@component-library/components/ScrollTransition/ScrollTransition';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  const isHomepage = layoutData?.sitecore.context.itemPath === '/';

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <header>
          <div id="header">
            {route && <Placeholder name="headless-header" rendering={route} />}
          </div>
        </header>
        <main>
          <div id="content">
            {isHomepage ? (
              <ScrollTransition initialTheme="A-HCA-White">
                {route && (
                  <Placeholder name="headless-main" rendering={route} />
                )}
              </ScrollTransition>
            ) : (
              route && <Placeholder name="headless-main" rendering={route} />
            )}
          </div>
        </main>
        <footer>
          <div id="footer">
            {isHomepage ? (
              <ScrollTransition transitionBackground={false}>
                {route && (
                  <Placeholder name="headless-footer" rendering={route} />
                )}
              </ScrollTransition>
            ) : (
              route && <Placeholder name="headless-footer" rendering={route} />
            )}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
