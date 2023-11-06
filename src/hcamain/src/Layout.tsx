/**
 * This Layout is needed for Starter Kit.
 */
import React, { useRef } from 'react';
import Head from 'next/head';
import {
  Placeholder,
  LayoutServiceData,
  Field,
  HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import Scripts from 'src/Scripts';
import '@hca/component-library/globals/index.scss';
import Modals from '@hca/component-library/components/Modals/Modals';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

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

  const dialogRef = useRef<HTMLDialogElement>();
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
            <div>
              <button
                onClick={() => {
                  console.log(dialogRef.current);
                  dialogRef.current?.showModal();
                }}
              >
                Open modal
              </button>
              <Modals dialogRef={dialogRef}>Content</Modals>
            </div>
            {route && <Placeholder name="headless-main" rendering={route} />}
          </div>
        </main>
        <footer>
          <div id="footer">
            {route && <Placeholder name="headless-footer" rendering={route} />}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
