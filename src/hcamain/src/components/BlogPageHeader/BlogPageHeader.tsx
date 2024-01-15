import React from 'react';
import { Field, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
}

type BlogPageHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BlogPageHeaderDefaultComponent = (
  props: BlogPageHeaderProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogPageHeaderProps): JSX.Element => {
  if (!props.fields) {
    return <BlogPageHeaderDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <RichText field={props.fields.Text} />
    </div>
  );
};
