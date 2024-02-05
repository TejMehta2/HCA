import React from 'react';
import { Field, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
}

type PlainHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PlainHeaderDefaultComponent = (props: PlainHeaderProps): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with text</span>
      </div>
    </div>
  );
};

export const Default = (props: PlainHeaderProps): JSX.Element => {
  if (!props.fields) {
    return <PlainHeaderDefaultComponent {...props} />;
  }
  return (
    <div>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <RichText field={props.fields.Text} />
    </div>
  );
};
