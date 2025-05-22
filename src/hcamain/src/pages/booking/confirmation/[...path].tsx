import { useEffect } from 'react';
import NotFound from 'src/NotFound';
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
import useCustomTracking from '@component-library/hooks/useCustomTracking/useCustomTracking';
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    context.params.path = [`booking/confirmation/,-w-,`];
  }

  const props = await sitecorePagePropsFactory.create(context);
  return {
    props,
  };
};

export default SitecorePage;
