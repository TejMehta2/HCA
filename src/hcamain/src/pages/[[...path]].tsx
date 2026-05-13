import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import NotFound from 'src/NotFound';
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
import { sitemapFetcher } from 'lib/sitemap-fetcher';
import useCustomTracking from '@component-library/hooks/useCustomTracking/useCustomTracking';

const SitecorePage = (props: SitecorePageProps): JSX.Element => {
  const { notFound, componentProps, layoutData, headLinks } = props;
  useCustomTracking();
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
          <EditingComponentPlaceholder rendering={layoutData.sitecore.route} />
        ) : (
          <Layout layoutData={layoutData} headLinks={headLinks} />
        )}
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async (context) => {
  // Fallback, along with revalidate in getStaticProps (below),
  // enables Incremental Static Regeneration. This allows us to
  // leave certain (or all) paths empty if desired and static pages
  // will be generated on request (development mode in this example).
  // Alternatively, the entire sitemap could be pre-rendered
  // ahead of time (non-development mode in this example).
  // See https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  if (
    process.env.NODE_ENV !== 'development' &&
    !process.env.DISABLE_SSG_FETCH
  ) {
    try {
      // Note: Next.js runs export in production mode
      paths = await sitemapFetcher.fetch(context);
      // Sort paths array by length ascending, so we statically build home page and landing pages first.
      try {
        paths.sort((a, b) => a.params.path.length - b.params.path.length);
      } catch (_) {}
    } catch (error) {
      console.log('Error occurred while fetching static paths');
      console.log(error);
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  const limit = process.env.STATIC_BUILD_LIMIT as unknown as number;

  return {
    paths: limit ? paths.slice(0, limit) : paths,
    fallback,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  // Allow pre-render errors to pass through in development, for debugging
  // Check if REVALIDATE_TIME is defined and valid, otherwise fallback to 1800 seconds
  const revalidateTime = Number(process.env.REVALIDATE_TIME);
  const revalidate =
    !isNaN(revalidateTime) && revalidateTime > 0 ? revalidateTime : 1800;

  if (process.env.NODE_ENV === 'development') {
    const props = await sitecorePagePropsFactory.create(context);
    return {
      props,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 5 seconds
      revalidate: 5, // In seconds
      notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
    };
  }

  // Squash pre-render errors in production which occur outside of suspense, re-direct to 404s
  try {
    const props = await sitecorePagePropsFactory.create(context);
    return {
      props,
      revalidate: revalidate, // In seconds
      notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
    };
  } catch (error) {
    console.error('getStaticProps. Sitecore error:', error);
    throw error;
  }
};

export default SitecorePage;
