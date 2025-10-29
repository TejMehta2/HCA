/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ImageField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

interface Fields {
  Image?: ImageField;
}

type BlogImageProps = {
  params?: Params;
  fields?: Fields;
};

const BlogImageDefaultComponent = (props: BlogImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Blog Image. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: BlogImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (!props.fields && !sitecoreContext?.route?.fields?.Image) {
    return <BlogImageDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const image = (
    props.fields?.Image
      ? props.fields.Image
      : sitecoreContext?.route?.fields?.Image
  ) as ImageField;

  const isContainerized = props?.params?.Containerized === '1';
  const keepAspectRatio = props?.params?.KeepAspectRatio === '1';

  if (isContainerized) {
    return (
      <RichText
        additionalStyles={props?.params?.styles}
        imageKeepAspectRatio={keepAspectRatio}
        id={componentAnchorId}
      >
        <figure>
          <NextJssImage
            field={image}
            editable={false}
            next={{
              width: 2000,
              height: 3000,
              sizes: '(max-width: 768px) 100vw, 90vw',
            }}
          />
        </figure>
      </RichText>
    );
  }

  return (
    <>
      <BlogContent
        theme={props.params?.Theme || 'A-HCA-White'}
        contentVariation="image"
        imageKeepAspectRatio={keepAspectRatio}
        id={componentAnchorId}
        {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
      >
        <figure>
          <NextJssImage
            field={image}
            editable={false}
            next={{
              width: 2000,
              height: 3000,
              sizes: '(max-width: 768px) 100vw, 90vw',
            }}
          />
        </figure>
      </BlogContent>
    </>
  );
};
