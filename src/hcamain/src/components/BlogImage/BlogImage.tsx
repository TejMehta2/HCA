import React from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from 'temp/component-library/site-components/BlogContent/BlogContent';
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
      <BlogContent theme={props.params.Theme || 'F-HCA-White'}>
        <p>
          London Bridge Hospital, part of HCA Healthcare UK, has once again been
          rated as &quot;Outstanding&quot; by the Care Quality Commission (CQC),
          following a recent inspection. London Bridge Hospital has held its
          Outstanding rating since 2016.
        </p>
      </BlogContent>
      <BlogContent theme={props.params.Theme || 'F-HCA-White'}>
        <figure>
          <Image field={props.fields.Image} />
        </figure>
      </BlogContent>
    </>
  );

  /* return (
    <div className={`component ${props.params.styles}`}>
      <Image field={props.fields.Image} />
    </div>
  ); */
};
