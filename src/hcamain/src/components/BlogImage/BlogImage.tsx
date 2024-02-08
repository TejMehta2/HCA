import React from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
}

type BlogImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BlogImageDefaultComponent = (
  props: BlogImageProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
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
  return (
    <div className={`component ${props.params.styles}`}>
      <Image field={props.fields.Image} />
    </div>
  );
};
