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

type HomepageCardsPatientStoriesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomepageCardsPatientStoriesDefaultComponent = (
  props: HomepageCardsPatientStoriesProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Carousel = (
  props: HomepageCardsPatientStoriesProps
): JSX.Element => {
  return <HomepageCardsPatientStoriesDefaultComponent {...props} />;
};

export const Standard = (
  props: HomepageCardsPatientStoriesProps
): JSX.Element => {
  return <HomepageCardsPatientStoriesDefaultComponent {...props} />;
};
