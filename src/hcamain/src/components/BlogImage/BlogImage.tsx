import React from 'react';
import {
  ImageField,
  Image,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';

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

  const image = (
    props.fields?.Image
      ? props.fields.Image
      : sitecoreContext?.route?.fields?.Image
  ) as ImageField;

  console.log(props);

  const isContainerized = props?.params?.Containerized === '1';
  const keepAspectRatio = props?.params?.KeepAspectRatio === '1';

  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles}>
        <figure>
          <Image field={image} />
        </figure>
      </RichText>
    );
  }

  return (
    <>
      <BlogContent
        theme={props.params?.Theme || 'A-HCA-White'}
        contentVariation={keepAspectRatio ? 'keep-aspect-ratio' : undefined}
      >
        <figure>
          <Image field={image} />
        </figure>
      </BlogContent>
    </>
  );
};
