/* eslint-disable @typescript-eslint/no-unused-vars */
// Specific page to partner with the consultant profile page
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
  // StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
//import { sitemapFetcher } from 'lib/sitemap-fetcher';
import NotFound from 'src/NotFound';
import { getActiveConsultantSlugs } from '../../../lib/consultant-finder/API_HCA';
import { GetHCAConfig } from 'lib/consultant-finder/getHCAConfig';
import { revalidate } from 'lib/consultant-finder/revalidateNow';
import RedirectOverlay from '@component-library/consultant-finder/RedirectOverlay/RedirectOverlay';
import useRouteChange from '@component-library/hooks/useRouteChange';
import { FINDER_PROFILE_ROOT_PATH } from 'lib/constants';
import useCustomTracking from '@component-library/hooks/useCustomTracking/useCustomTracking';
import { PageRouteMetadata } from 'components/Metadata/Metadata';
import Head from 'next/dist/shared/lib/head';

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  const { isRouteChanging } = useRouteChange();
  useCustomTracking();
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  const route = layoutData.sitecore.route as PageRouteMetadata;
  const { fields } = route;
  const follow = fields?.NoFollow?.value ? 'nofollow' : 'follow';
  const index = fields?.NoIndex?.value ? 'noindex' : 'index';
  const hideFromWebsiteSearch = fields?.HideFromWebsiteSearch;
  //console.log('fields..', fields);
  //console.log('follow', follow);
  //console.log('index', index);
  //console.log('hideFromWebsiteSearch', hideFromWebsiteSearch);
  //debugger;
  const isEditing = layoutData.sitecore.context.pageEditing;
  const isComponentRendering =
    layoutData.sitecore.context.renderingType === RenderingType.Component;

  return (
    <div>
      <Head>
        <meta name="robots" content={`${follow}, ${index}`} key="robots2" />
        {hideFromWebsiteSearch?.value && (
          <meta
            name="hideFromWebsiteSearch"
            content={hideFromWebsiteSearch?.value?.valueOf().toString()}
          />
        )}
      </Head>
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
              {isRouteChanging && <RedirectOverlay></RedirectOverlay>}
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
  let paths: any = [];
  let slugs: string[] = [];

  // note getStaticPaths runs on every request in dev mode,
  // so only do this for all consultants if deployed
  if (
    process.env.NODE_ENV !== 'development' &&
    !process.env.DISABLE_SSG_FETCH
  ) {
    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  try {
    // Note: Next.js runs export in production mode
    if (!revalidate.isCacheAvailable()) {
      revalidate.setNoCache(true); // we can't use the unstable_cache from here in the build process
    }
    const HCAAPIConfig = await GetHCAConfig();
    if (HCAAPIConfig.aPI_HCA_All_Consultants_MockConsultants) {
      // mock from Sitecore / SSG slows down the build, only use real on prod
      slugs = HCAAPIConfig.aPI_HCA_All_Consultants_MockSlugsList.split('\r\n');
      slugs = slugs.filter((slug) => slug && slug.length > 0);
    } else {
      slugs = await getActiveConsultantSlugs();
    }
  } catch (error) {
    console.warn(
      'Error occurred in StepConsultantProfile getStaticPaths',
      error
    );
  } finally {
    revalidate.setNoCache(false); // reset default use of unstable_cache
  }

  console.log('StepConsultantProfile slugs to pre-render', slugs);
  if (slugs) {
    paths = slugs.map((slug) => ({
      params: { path: slug },
    }));
  } else {
    paths = [];
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
    // context.params { path: [ 'mr-andrew-goldberg' ] }
    //console.log('StepConsultantProfile path:', context?.params?.path);
    context.params.requestPath = context.params.path;
    context.params.path = [`${FINDER_PROFILE_ROOT_PATH}/,-w-,`];
  }
  // Allow pre-render errors to pass through in development, for debugging
  if (process.env.NODE_ENV === 'development') {
    const revalidationSeconds = 5;
    const props = await sitecorePagePropsFactory.create(context);
    return {
      props,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 5 seconds
      revalidate: revalidationSeconds, //5, // In seconds
      notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
    };
  } else {
    try {
      // Squash pre-render errors in production which occur outside of suspense, re-direct to 404s
      if (!revalidate.isCacheAvailable()) {
        revalidate.setNoCache(true); // we can't use the unstable_cache from here in the build process
      }
      const HCAAPIConfig = await GetHCAConfig();
      const revalidationSeconds =
        Number.parseInt(
          String(HCAAPIConfig?.nextJSRevalidationProfilePageSeconds),
          10
        ) ?? 300;
      //console.log('CF page revalidationSeconds: ', revalidationSeconds);
      const props = await sitecorePagePropsFactory.create(context);
      return {
        props,
        revalidate: revalidationSeconds, // In seconds
        notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
      };
    } catch (error) {
      console.error(error);
      return {
        notFound: true,
      };
    } finally {
      revalidate.setNoCache(false); // reset default use of unstable_cache
    }
  }
};

export default SitecorePage;
