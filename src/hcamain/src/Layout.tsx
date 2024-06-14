/**
 * This Layout is needed for Starter Kit.
 */
import React, { useRef, useEffect } from 'react';
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
import Params from 'src/types/params';
import ErrorBoundary from 'lib/ErrorBoundary';
import YextProvider from '@component-library/yext/YextProvider/YextProvider';
import Schema from './Schema';

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

type FirstComponentProps = {
  params?: Params;
};

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  const currentPagePath = layoutData?.sitecore.context.itemPath as
    | string[]
    | string;
  const isHomepage = currentPagePath === '/';
  const noHeader = currentPagePath.includes('/Payment-Form');

  const mainRef = useRef<HTMLElement>(null);

  /* Remove built in form styles if they exist */
  useEffect(() => {
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };

    // Checks for changes in the DOM and runs when it sees a change in the childList or subtree
    const observer = new MutationObserver(() => {
      // Add a random UID to this hidden field
      // We hide it via CSS in globals/forms.module.scss
      const hiddenInput = document.querySelector(
        '[name="HiddenFormInstanceUID"]'
      );
      hiddenInput?.setAttribute?.('value', crypto?.randomUUID?.());
    });

    observer.observe(mainRef.current as Node, config);

    return () => {
      observer.disconnect();
    };
  }, []);

  //  On the homepage get the theme of the first component to set the initial theme of the ScrollTransition component

  let firstComponentTheme;
  if (isHomepage) {
    const firstComponent = layoutData.sitecore.route?.placeholders[
      'headless-main'
    ][0] as FirstComponentProps;
    const firstComponentParams = firstComponent?.params as Params;

    firstComponentTheme = firstComponentParams.Theme
      ? firstComponentParams?.Theme
      : 'B-HCA-Navy-Blue';
  }

  const RenderWithErrorBoundary = (
    children: React.ReactNode,
    index: number
  ) => <ErrorBoundary key={index}>{children}</ErrorBoundary>;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <Schema layoutData={layoutData} />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <YextProvider>
        <>
          <div className={mainClassPageEditing}>
            {route && (
              <Placeholder
                name="headless-head"
                rendering={route}
                renderEach={RenderWithErrorBoundary}
              />
            )}
            {!noHeader && (
              <header>
                <div id="header">
                  {route && (
                    <Placeholder
                      name="headless-header"
                      rendering={route}
                      renderEach={RenderWithErrorBoundary}
                    />
                  )}
                </div>
              </header>
            )}
            <main
              ref={mainRef}
              data-event={'buttonClick'}
              data-navigation-type={'buttonClick'}
            >
              <div id="content">
                {isHomepage ? (
                  <ScrollTransition initialTheme={firstComponentTheme}>
                    {route && (
                      <Placeholder
                        name="headless-main"
                        rendering={route}
                        renderEach={RenderWithErrorBoundary}
                      />
                    )}
                  </ScrollTransition>
                ) : (
                  route && (
                    <Placeholder
                      name="headless-main"
                      rendering={route}
                      renderEach={RenderWithErrorBoundary}
                    />
                  )
                )}
              </div>
            </main>
            <footer>
              <div id="footer">
                {isHomepage ? (
                  <ScrollTransition transitionBackground={false}>
                    {route && (
                      <Placeholder
                        name="headless-footer"
                        rendering={route}
                        renderEach={RenderWithErrorBoundary}
                      />
                    )}
                  </ScrollTransition>
                ) : (
                  route && (
                    <Placeholder
                      name="headless-footer"
                      rendering={route}
                      renderEach={RenderWithErrorBoundary}
                    />
                  )
                )}
              </div>
            </footer>
          </div>
        </>
      </YextProvider>
    </>
  );
};

export default Layout;
