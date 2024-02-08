import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
}

type BlogTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BlogTextDefaultComponent = (props: BlogTextProps): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
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
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Text} />
    </div>
  );
};
