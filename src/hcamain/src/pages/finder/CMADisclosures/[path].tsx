/* eslint-disable @typescript-eslint/no-unused-vars */
// Specific page to partner with the CMA disclosure page
// Based on https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// See getStaticPaths/Props below for comment and differences between this and the main pages

import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ConsultantFinderContextProvider } from '@component-library/context/consultantFinderContext';
import Layout from 'src/Layout';
import {
  RenderingType,
  SitecoreContext,
  ComponentPropsContext,
  EditingComponentPlaceholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
import NotFound from 'src/NotFound';

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  const isEditing = layoutData.sitecore.context.pageEditing;
  const isComponentRendering =
    layoutData.sitecore.context.renderingType === RenderingType.Component;

  return (
    <div>
      <ComponentPropsContext value={componentProps}>
        <SitecoreContext
          componentFactory={componentBuilder.getComponentFactory({ isEditing })}
          layoutData={layoutData}
        >
          {/*
          Sitecore Pages supports component rendering to avoid refreshing the entire page during component editing.
          If you are using Experience Editor only, this logic can be removed, Layout can be left.
        */}
          {isComponentRendering ? (
            <EditingComponentPlaceholder
              rendering={layoutData.sitecore.route}
            />
          ) : (
            <ConsultantFinderContextProvider>
              <Layout layoutData={layoutData} headLinks={headLinks} />
            </ConsultantFinderContextProvider>
          )}
        </SitecoreContext>
      </ComponentPropsContext>
    </div>
  );
};

// paths are known in advance
// https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
export const getStaticPaths: GetStaticPaths = async () => {
  let fallback: boolean | 'blocking' = 'blocking';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths: any = [];

  // could return a list of CMA slugs if known at build time
  // note getStaticPaths runs on every request in dev mode,
  // so only do this for all consultants if deployed
  if (
    process.env.NODE_ENV !== 'development' &&
    !process.env.DISABLE_SSG_FETCH
  ) {
    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  fallback = 'blocking';

  return {
    paths,
    fallback,
  };
};

// data load can be done here and/or at the component level too with get component props.
export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params) {
    context.params.requestPath = context.params.path;
    context.params.path = [`Finder/CMADisclosures/,-w-,`];
  }

  // Allow pre-render errors to pass through in development, for debugging
  if (process.env.NODE_ENV === 'development') {
    const props = await sitecorePagePropsFactory.create(context);
    //console.log('props:', props);
    return {
      props,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 5 seconds
      revalidate: 5, // In seconds
      notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
    };
  } else {
    // Squash pre-render errors in production which occur outside of suspense, re-direct to 404s
    const props = await sitecorePagePropsFactory.create(context);
    //console.log('props:', props);
    try {
      return {
        props,
        revalidate: 300, // In seconds
        notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
      };
    } catch (error) {
      console.error(error);
      return {
        notFound: true,
      };
    }
  }
};

export default SitecorePage;
