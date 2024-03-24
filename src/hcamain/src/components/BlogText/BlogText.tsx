import React from 'react';
import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';

interface Fields {
  Text?: Field<string>;
}

type BlogTextProps = {
  params?: Params;
  fields?: Fields;
};

const BlogTextDefaultComponent = (props: BlogTextProps): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogTextProps): JSX.Element => {
  if (!props.fields) {
    return <BlogTextDefaultComponent {...props} />;
  }

  return (
    <BlogContent theme={props.params?.Theme || 'A-HCA-White'}>
      <RichText field={props.fields?.Text} />
    </BlogContent>
  );
};
