import React from 'react';
import {
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ServiceFields = {
  name: Field<string>
}

interface Fields {
  Heading : Field<string>;
  Title : Field<string>;
  Description : Field<string>;
  CTA : LinkField;
  Listofservices : {
    results: ServiceFields[]
  }
}

type HomepageServiceCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomepageServiceCardsDefaultComponent = (props: HomepageServiceCardsProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Homepage Service Cards</span>
    </div>
  </div>
);

export const Standard = (props: HomepageServiceCardsProps): JSX.Element => {
  
  return <HomepageServiceCardsDefaultComponent {...props} />
};

