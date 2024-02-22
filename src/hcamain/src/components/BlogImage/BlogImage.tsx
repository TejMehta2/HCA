import React from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';

interface Fields {
  Image: ImageField;
}

type BlogImageProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
  fields: Fields;
};

const BlogImageDefaultComponent = (props: BlogImageProps): JSX.Element => {
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
    <>
      <BlogContent theme={props.params.Theme || 'A-HCA-White'}>
        <figure>
          <Image field={props.fields.Image} />
        </figure>
      </BlogContent>
    </>
  );
};
