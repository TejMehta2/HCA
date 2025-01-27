/* eslint-disable @next/next/no-css-tags */
// Specific page to partner with the finder (non profile) pages
// Delegation from the top level [[...path]] via an exception regex change to middleware.ts
// Based on https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// not using SSG on these frames as they have dynamic data and rendering
// helps to avoid issues at build time with invalid data

import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
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
import useCustomTracking from '@component-library/hooks/useCustomTracking/useCustomTracking';
import { PageRouteMetadata } from 'components/Metadata/Metadata';
import Head from 'next/head';
import IVFApp from 'src/byoc/ivf-pricer/IVFApp';

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
}: SitecorePageProps): JSX.Element => {
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

  const route = layoutData.sitecore.route as PageRouteMetadata;
  const { fields } = route;
  const follow = fields?.NoFollow ? 'nofollow' : 'follow';
  const index = fields?.NoIndex ? 'noindex' : 'index';
  const hideFromWebsiteSearch = fields?.HideFromWebsiteSearch;

  //console.log('follow', follow);
  //console.log('index', index);
  //console.log('hideFromWebsiteSearch', hideFromWebsiteSearch);

  return (
    <div>
      <Head>
        <meta name="robots" content={`${follow}, ${index}`} key="robots3" />
        {hideFromWebsiteSearch?.value && (
          <meta
            name="hideFromWebsiteSearch"
            content={hideFromWebsiteSearch?.value?.valueOf().toString()}
          />
        )}
        <link
          href="../static/legacy/ivf-pricer/style/site-main.css"
          rel="stylesheet"
        ></link>
        <link
          href="../static/legacy/ivf-pricer/style/react-main.css"
          rel="stylesheet"
        ></link>
      </Head>
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
            <IVFApp></IVFApp>
          )}
        </SitecoreContext>
      </ComponentPropsContext>
    </div>
  );
};

// replace getStaticProps with getServerSideProps
// don't need SSG for the wizard frames in this app as they have dynamic data and rendering
// helps to avoid issues at build time with invalid data
export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.params) {
    // e.g. context.params { path: [ 'Step-Locationss' ] }
    context.params.requestPath = context.params.path;
    context.params.path = [`ivf-candidate/${context.params.path}/`];
  }

  const props = await sitecorePagePropsFactory.create(context);
  //console.log('props:', props);
  return { props };
}

export default SitecorePage;
