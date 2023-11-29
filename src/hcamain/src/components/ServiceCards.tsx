import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ServiceFields = {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  Link: LinkField;
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Description: Field<string>;
  CTAIcon: ImageField;
  CTALink: LinkField;
  services: {
    ServicesList: ServiceFields[];
  };
}

type ServiceCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ServiceCardsDefaultComponent = (
  props: ServiceCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Homepage Service Cards</span>
    </div>
  </div>
);

export const Standard = (props: ServiceCardsProps): JSX.Element => {
  return <ServiceCardsDefaultComponent {...props} />;
};
