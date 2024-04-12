import React from 'react';
import {
  Field,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';

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

  const isContainerized = props?.params?.Containerized === '1';

  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles}>
        <JssRichText field={props.fields?.Text} />
      </RichText>
    );
  }

  return (
    <BlogContent theme={props.params?.Theme || 'A-HCA-White'}>
      <RichText>
        <JssRichText field={props.fields?.Text} />
      </RichText>
    </BlogContent>
  );
};
