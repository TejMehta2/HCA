import React from 'react';
import {
  Field,
  Text,
  Link,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselCards from 'temp/component-library/components/CarouselCards/CarouselCards';

type CTAIconFields = {
  SVGMarkup: Field<string>;
};

interface StoriesFields {
  Title: Field<string>;
  Description: Field<string>;
  Date: Field<string>;
  Image: ImageField;
}

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  CardCTAText: Field<string>;
  CTAIcon: {
    Icon: CTAIconFields[];
  };
  CTALink: LinkField;
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
    <CarouselCards
      title={<Text field={props.fields.Title} />}
      link={<Link field={props.fields.CTALink} />}
    ></CarouselCards>
  </div>
);

export const Carousel = (props: PatientStoriesProps): JSX.Element => {
  return <PatientStoriesDefaultComponent {...props} />;
};

export const Default = (props: PatientStoriesProps): JSX.Element => {
  return <PatientStoriesDefaultComponent {...props} />;
};
