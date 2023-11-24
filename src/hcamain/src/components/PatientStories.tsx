import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface StoriesFields {
  Title: Field<string>;
  Description: Field<string>;
  Date: Field<string>;
  Image: ImageField;
}

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Icon: ImageField;
  CTALink: LinkField;
  CardCTAText: Field<string>;
  stories: {
    StoriesList: StoriesFields[];
  };
}

type PatientStoriesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PatientStoriesDefaultComponent = (
  props: PatientStoriesProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Carousel = (
  props: PatientStoriesProps
): JSX.Element => {
  return <PatientStoriesDefaultComponent {...props} />;
};

export const Standard = (
  props: PatientStoriesProps
): JSX.Element => {
  return <PatientStoriesDefaultComponent {...props} />;
};
