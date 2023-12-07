import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CTAIconFields = {
  SVGMarkup: Field<string>;
};

interface CountersFields {
  Number: Field<string>;
  Text: Field<string>;
}

interface CQCStatusFields {
  Title: Field<string>;
  Icon: Field<string>;
  Logo: ImageField;
}

interface DoctifyReviewsFields {
  Stars: Field<string>;
  Reviews: Field<string>;
}

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  CTAIcon: {
    Icon: CTAIconFields[];
  };
  CTALink: LinkField;
  counters: {
    CountersList: CountersFields[];
  };
  cQCStatus: {
    CQCStatus: CQCStatusFields[];
  };
  doctifyReviews: {
    DoctifyReviews: DoctifyReviewsFields[];
  };
}

type IntroBlockProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const IntroBlockDefaultComponent = (props: IntroBlockProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Default = (props: IntroBlockProps): JSX.Element => {
  return <IntroBlockDefaultComponent {...props} />;
};
