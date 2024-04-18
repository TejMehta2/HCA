/* eslint-disable @typescript-eslint/no-unused-vars */
// Specific page to partner with the consultant profile page
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
  // StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
//import { sitemapFetcher } from 'lib/sitemap-fetcher';
import NotFound from 'src/NotFound';
import {
  // checkIfLiveBookingIsAvailable,
  getActiveConsultantSlugs,
} from '../../../lib/consultant-finder/API_HCA';

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
      {/* hello finder profile sub-page world */}
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
// TODO
// add to sitemap
export const getStaticPaths: GetStaticPaths = async () => {
  let fallback: boolean | 'blocking' = 'blocking';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let paths: any = [];
  let slugs: string[] = [];

  // TODO control the loading of real / test slugs from sitecore settings

  //console.log('IN StepConsultantProfile GetStaticPaths');
  // note getStaticPaths runs on every request in dev mode,
  // so only do this for all consultants if deployed
  if (
    process.env.NODE_ENV !== 'development' &&
    !process.env.DISABLE_SSG_FETCH
  ) {
    try {
      // Note: Next.js runs export in production mode
      //paths = await sitemapFetcher.fetch(context);
      slugs = await getActiveConsultantSlugs();
    } catch (error) {
      console.warn(
        'Error occurred in StepConsultantProfile getStaticPaths',
        error
      );
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  } else {
    //mock the real call with just a few consultants to pre-fetch if in dev.
    //slugs = ['mr-andrew-goldberg', 'mr-sam-singh', 'mr-christian-brown'];
  }

  slugs = [];
  paths = slugs.map((slug) => ({
    params: { path: slug },
  }));
  fallback = 'blocking';

  //console.log('paths:', paths);
  //console.log('fallback:', fallback);

  console.log('OUT StepConsultantProfile GetStaticPaths');
  return {
    paths,
    fallback,
  };
};

// data load can be done here and/or at the component level too with get component props.
export const getStaticProps: GetStaticProps = async (context) => {
  //console.log('IN StepConsultantProfile GetStaticProps');
  //console.log('context.params', context.params);

  if (context.params) {
    // context.params { path: [ 'mr-andrew-goldberg' ] }
    console.log('StepConsultantProfile path:', context?.params?.path);
    context.params.requestPath = context.params.path;
    context.params.path = [`Finder/StepConsultantProfile/,-w-,`];
  }

  // if needed here, we can get our slug from the url path like this...
  /*
  let slug = '';
  const path = context?.params?.requestPath;
  if (path !== undefined) {
    if (typeof path !== 'string') {
      slug = path.pop() ?? '';
    } else {
      slug = path;
    }
  }
  */
  //we can call out to services server side here..
  //console.log("slug: ",slug);
  //const isLDBConsultant = await checkIfLiveBookingIsAvailable(slug);
  //console.log("isLDBConsultant: ",isLDBConsultant);
  //const consultantProfileJson = await getSpecialistProfileData(slug);
  //console.log("consultantProfileJson: ", consultantProfileJson);
  // props.data = 'profile data';

  // but also at the component level using component props...

  //console.log('OUT StepConsultantProfile GetStaticProps');
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
    try {
      // Squash pre-render errors in production which occur outside of suspense, re-direct to 404s
      const props = await sitecorePagePropsFactory.create(context);
      //console.log('props:', props);
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
