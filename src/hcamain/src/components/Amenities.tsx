import React from 'react';
import {
  Field,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  SVGMarkup: Field<string>;
};

type AmenitiesFields = {
  Title: Field<string>;
  icon: {
    Icon: HCAIconFields[];
  };
};

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
  amenities: {
    AmenitiesList: AmenitiesFields[];
  };
}

type AmenitiesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AmenitiesDefaultComponent = (
  props: AmenitiesProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Homepage Service Cards</span>
    </div>
  </div>
);

export const Default = (props: AmenitiesProps): JSX.Element => {
  return <AmenitiesDefaultComponent {...props} />;
};
