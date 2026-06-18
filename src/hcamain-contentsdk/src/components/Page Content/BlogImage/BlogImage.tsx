import { type JSX } from 'react';
/* eslint-disable prettier/prettier */

import { ImageField } from '@sitecore-content-sdk/nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import { ComponentWithContextProps } from 'lib/component-props';
import { isInsideContainerComponent } from 'lib/utility-functions/insideContainerComponent';

interface Fields {
  Image?: ImageField;
}

type BlogImageProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
};

const BlogImageDefaultComponent = (props: BlogImageProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

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
  if (!props.fields && !props.page.layout.sitecore.route?.fields?.Image) {
    return <BlogImageDefaultComponent {...props} />;
  }

  const isInsideContainer = isInsideContainerComponent(props.params);

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const image = (
    props.fields?.Image
      ? props.fields.Image
      : props.page.layout.sitecore.route?.fields?.Image
  ) as ImageField;
 
  const keepAspectRatio = props?.params?.KeepAspectRatio === '1';

  if (isInsideContainer) {
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
        {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
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
