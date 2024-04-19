// Specific page to partner with the finder (non profile) pages
// Delegation from the top level [[...path]] via an exception regex change to middleware.ts
// Based on https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// not using SSG on these frames as they have dynamic data and rendering
// helps to avoid issues at build time with invalid data

import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { ConsultantFinderContextProvider } from 'src/context/consultantFinderContext';
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

// replace getStaticProps with getServerSideProps
// don't need SSG for the wizard frames in this app as they have dynamic data and rendering
// helps to avoid issues at build time with invalid data
export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.params) {
    // e.g. context.params { path: [ 'Step-Locationss' ] }
    context.params.requestPath = context.params.path;
    context.params.path = [`Finder/${context.params.path}/`];
  }

  const props = await sitecorePagePropsFactory.create(context);
  //console.log('props:', props);
  return { props };
}

export default SitecorePage;
