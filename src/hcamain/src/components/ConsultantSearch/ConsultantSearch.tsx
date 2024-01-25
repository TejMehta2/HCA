import React from 'react';
import { Field, Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  SearchPlaceholder: Field<string>;
}

type ConsultantSearchProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ConsultantSearchDefaultComponent = (
  props: ConsultantSearchProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Search no datasource</span>
    </div>
  </div>
);

export const Default = (props: ConsultantSearchProps): JSX.Element => {
  if (!props.fields) {
    return <ConsultantSearchDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.SearchPlaceholder} />
      <br />
    </div>
  );
};
