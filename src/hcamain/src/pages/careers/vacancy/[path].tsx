/* eslint-disable @typescript-eslint/no-unused-vars */
// Specific page to partner with the CMA disclosure page
// Based on https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages
// See getStaticPaths/Props below for comment and differences between this and the main pages

import { useEffect } from 'react';
import { ConsultantFinderContextProvider } from '@component-library/context/consultantFinderContext';
import Layout from 'src/Layout';
import {
  RenderingType,
  SitecoreContext,
  ComponentPropsContext,
  EditingComponentPlaceholder,
  debug,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
import NotFound from 'src/NotFound';
import { GetServerSidePropsContext } from 'next';
import { SitecoreVacancyPageProps } from 'components/JobDetailsHeader/JobDetailsHeader.types';

const SitecorePage = (props: SitecoreVacancyPageProps): JSX.Element => {
  const { notFound, componentProps, layoutData, headLinks } = props;
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (notFound || !layoutData?.sitecore?.route) {
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    if (context.params) {
      context.params.requestPath = context.params.path;
      context.params.path = [`Careers/Vacancy/,-w-,`];
    }
    const props = await sitecorePagePropsFactory.create(context);

    debug.common('sitecorePagePropsFactory.create returned:', props);

    if (props.layoutData.sitecore.context.pageEditing) {
      return {
        props: {
          ...props,
        },
      };
    }

    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/job/${context.query.path}`
    );

    if (response.status === 404) {
      return { notFound: true };
    }

    const data = await response.json();
    const vacancy = data.response;
    return {
      props: {
        ...props,
        layoutData: {
          ...props.layoutData,
          sitecore: {
            ...props.layoutData.sitecore,
            route: {
              ...(props.layoutData.sitecore.route ?? {}),
              vacancy,
            },
          },
        },
      },
    };
  } catch (e) {
    console.error('Fatal SSR error:', e);
    return {
      notFound: true,
    };
  }
}

export default SitecorePage;
