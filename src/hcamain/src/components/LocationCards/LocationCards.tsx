import React from 'react';
import {
  Field,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type VideoProvidersFields = {
  name?: string;
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Locations?: VideoProvidersFields;
  FilterOptions?: Field<string>;
}

type LocationCardsProps = {
  params?: Params;
  fields?: Fields;
};

const LocationCardsDefaultComponent = (props: LocationCardsProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">LocationCards no datasource</span>
    </div>
  </div>
);

export const Default = (props: LocationCardsProps): JSX.Element => {
  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.Heading} />
      <br />
      <JssText field={props.fields?.Title} />
      <br />
      <JssText field={props.fields?.Text} />
      <br />
    </div>
  );
};
