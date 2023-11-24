import React from 'react';
import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

type PracticeFields = {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  DoctifyPractice: Field<string>;
};

type ServiceFields = {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  DoctifyKeywordId: Field<string>;
};

type FiltersFields = {
  Filter: Field<string>;
};

interface Fields {
  Title: Field<string>;
  NumberOfCards: Field<string>;
  CTACard: LinkField;
  CTAIcon: ImageField;
  CTALink: LinkField;
  practice: {
    PracticeList: PracticeFields[];
  };
  service: {
    ServicesList: ServiceFields[];
  };
  customFilters: {
    CustomFiltersList: FiltersFields[];
  };
}

type DoctorCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DoctorCardsDefaultComponent = (props: DoctorCardsProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Standard = (props: DoctorCardsProps): JSX.Element => {
  return <DoctorCardsDefaultComponent {...props} />;
};