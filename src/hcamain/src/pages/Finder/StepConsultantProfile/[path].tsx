/* eslint-disable @typescript-eslint/no-unused-vars */
// Specific page to partner with the consultant profile page
// Based on https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// See getStaticPaths/Props below for comment and differences between this and the main pages

import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
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

  if (notFound || !layoutData?.sitecore?.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <div>NOT FOUND FROM THE SUB-PAGE</div>;
  }

  const isEditing = layoutData.sitecore.context.pageEditing;
  const isComponentRendering =
    layoutData.sitecore.context.renderingType === RenderingType.Component;
  return (
    <div>
      hello finder profile sub-page world
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
            <Layout layoutData={layoutData} headLinks={headLinks} />
          )}
        </SitecoreContext>
      </ComponentPropsContext>
    </div>
  );
};

// paths are not known example. https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// TODO
// replace with list of known slugs...
// add to sitemap
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  paths = [];
  fallback = 'blocking';

  console.log('IN Finder profile subpage GetStaticPaths');
  console.log('paths:', paths);
  console.log('fallback:', fallback);
  return {
    paths,
    fallback,
  };
};

// TODO
// call Doctify API to get profile data for slug
export const getStaticProps: GetStaticProps = async (context) => {
  console.log('IN Finder profile subpage GetStaticProps');
  console.log('context.params', context.params);

  if (context.params) {
    // context.params { path: [ 'mr-andrew-goldberg' ] }
    context.params.requestPath = context.params.path;
    context.params.path = [`Finder/StepConsultantProfile/,-w-,`];
  }
  const props = await sitecorePagePropsFactory.create(context);
  console.log('props:', props);

  let slugPath = '';
  const path = context?.params?.requestPath;
  if (path !== undefined) {
    if (typeof path !== 'string') {
      slugPath = path.pop() ?? '';
    } else {
      slugPath = path;
    }
  }

  // Assumes we have a service that calls CH GraphQL to get the data
  // based on the blog name
  //const blogData = await externalDataFactory.get(blogPath);
  //props.blogData = blogData;

  props.slugData = 'andy profile data';
  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};

export default SitecorePage;
