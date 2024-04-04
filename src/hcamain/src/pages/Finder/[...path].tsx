// Specific page to partner with the finder pages
// Delegation from the top level [[...path]] via an exception regex change to middleware.ts
// Based on https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// See getStaticPaths/Props below for comment and differences between this and the main pages

import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ConsultantFinderContextProvider } from 'src/context/consultantFinderContext';
import Layout from 'src/Layout';
import {
  RenderingType,
  SitecoreContext,
  ComponentPropsContext,
  EditingComponentPlaceholder,
  StaticPath,
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
      {/* hello finder level sub-page world */}
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

// paths are not known example. https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// replace with list of known slugs...
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  fallback = 'blocking';

  //console.log('IN Finder subpage GetStaticPaths');
  //console.log('paths:', paths);
  //console.log('fallback:', fallback);
  return {
    paths,
    fallback,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  //console.log('IN Finder subpage GetStaticProps');
  //console.log('context.params', context.params);

  if (context.params) {
    // e.g. context.params { path: [ 'Step-Locationss' ] }
    context.params.requestPath = context.params.path;
    context.params.path = [`Finder/${context.params.path}/`];
  }
  const props = await sitecorePagePropsFactory.create(context);
  //console.log('props:', props);

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 300, // In seconds
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };

  // Squash pre-render errors in production which occur outside of suspense, re-direct to 404s
  try {
    const props = await sitecorePagePropsFactory.create(context);
    return {
      props,
      revalidate: 5, // In seconds
      notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default SitecorePage;
