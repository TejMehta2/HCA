import React from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
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
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogImageProps): JSX.Element => {
  if (!props.fields) {
    return <BlogImageDefaultComponent {...props} />;
  }

  const isContainerized = props?.params?.Containerized === '1';
  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles}>
        <figure>
          <Image field={props.fields?.Image} />
        </figure>
      </RichText>
    );
  }

  return (
    <>
      <BlogContent theme={props.params?.Theme || 'A-HCA-White'}>
        <figure>
          <Image field={props.fields?.Image} />
        </figure>
      </BlogContent>
    </>
  );
};
