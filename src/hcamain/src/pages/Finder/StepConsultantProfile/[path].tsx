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
  StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
import { sitemapFetcher } from 'lib/sitemap-fetcher';
import { parse } from 'node-html-parser';

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
            <ConsultantFinderContextProvider>
              <Layout layoutData={layoutData} headLinks={headLinks} />
            </ConsultantFinderContextProvider>
          )}
        </SitecoreContext>
      </ComponentPropsContext>
    </div>
  );
};

// paths are not known in advance 
// https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// TODO
// replace with list of known slugs...
// and add to sitemap
export const getStaticPaths: GetStaticPaths = async () => {
  let fallback: boolean | 'blocking' = 'blocking';
  let paths: any[] = [];
  let slugs:string[] = [];
  let ldbSlugs:string[] = [];

  console.log('IN Finder profile subpage GetStaticPaths');
  
  // note getStaticPaths runs on every request in dev mode, 
  // so only do this for all consultants if deployed 
  if (process.env.NODE_ENV !== 'development' && !process.env.DISABLE_SSG_FETCH) {
    try {
      // Note: Next.js runs export in production mode
      //paths = await sitemapFetcher.fetch(context);


    } catch (error) {
      console.log('Error occurred while fetching static paths');
      console.log(error);
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  }
  else
  {
    //mock the real call with just a few consultants to pre-fetch if in dev.
    slugs = ['mr-andrew-goldberg','mr-sam-singh','mr-christian-brown'];
    ldbSlugs = ['mr-andrew-goldberg','mr-sam-singh','mr-christian-brown'];

    // using current/legacy website xml sitemap for now
    // replace once we have a backend that can query doctify for list of consultant slugs
    const consultantSlugsURL = `https://www.hcahealthcare.co.uk/sitemap.hca.consultant-finder.xml`;
    try {
      const res = await fetch(consultantSlugsURL);
      if (res.ok) {
        const consultantsXML = await res.text();
        //console.log('consultantsXML');
        /*looks like this
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mr-sam-singh</loc></url>
          <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mr-chukwuemeka-okaro</loc></url>
          <url><loc>https://www.hcahealthcare.co.uk/finder/specialists/mohamed-imam</loc></url>
        </urlset>*/
        // parse with this https://www.npmjs.com/package/node-html-parser
        const root = parse(consultantsXML);
        root.getElementsByTagName('loc').forEach(
          (urlEle) => 
          {
            const slug = urlEle.text.split("/").pop();
            slugs = slugs.concat(slug);
          }
        );
        console.log("CF all slugs:", slugs);
      } else {
        // couldn't get the consultant site map
        console.error(`Could not load consultant slugs list for pre-render from ${consultantSlugsURL}`);
      }
    } catch(e) {
      console.error(`Could not load consultant slugs list for pre-render from ${consultantSlugsURL} failed with exception ${e}`);
    }

    // using current/legacy live diary consultants list for now
    // replace once we have a backend that can query for a list of live diary consultant slugs
    const ldbConsultantSlugsURL = `https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/ldbConsultants`;
    try {
      const res = await fetch(ldbConsultantSlugsURL);
      if (res.ok) {
        const consultantsOnLDB = await res.json();

        //console.log('consultantsOnLDB', consultantsOnLDB);

        consultantsOnLDB.forEach(
          (consultant) => 
          {
            const slug = consultant.UniqueKey;
            if(consultant.Value === 'True')
            {
              ldbSlugs = ldbSlugs.concat(slug);
            }
          }
        );
        console.log("CF LDB slugs:", ldbSlugs);
      } else {
        // couldn't get the ldb consultant slugs
        console.error(`Could not load LDB consultant slugs list for pre-render from ${ldbConsultantSlugsURL}`);
      }
    } catch(e) {
      console.error(`Could not load LDB consultant slugs list for pre-render from ${ldbConsultantSlugsURL} failed with exception ${e}`);
    }

    paths = slugs.map(slug => ({
      params: {path: slug},
    }));
    fallback = 'blocking';
  }

  //console.log('paths:', paths);
  //console.log('fallback:', fallback);
  return {
    paths,
    fallback,
  };
};

// TODO
// call Doctify API to get profile data for slug
// data load can be done at the component level too with get component props.
export const getStaticProps: GetStaticProps = async (context) => {
  console.log('IN Finder profile subpage GetStaticProps');
  //console.log('context.params', context.params);

  if (context.params) {
    // context.params { path: [ 'mr-andrew-goldberg' ] }
    context.params.requestPath = context.params.path;
    context.params.path = [`Finder/StepConsultantProfile/,-w-,`];
  }
  const props = await sitecorePagePropsFactory.create(context);
  //console.log('props:', props);

  let slugPath = '';
  const path = context?.params?.requestPath;
  if (path !== undefined) {
    if (typeof path !== 'string') {
      slugPath = path.pop() ?? '';
    } else {
      slugPath = path;
    }
  }
  console.log("slugPath",slugPath);

  // Assumes we have a service that calls CH GraphQL to get the data
  // based on the blog name
  //const blogData = await externalDataFactory.get(blogPath);
  //props.blogData = blogData;

  // props.slugData = 'andy profile data';
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
