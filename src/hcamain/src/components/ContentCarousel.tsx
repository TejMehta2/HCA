import React from 'react';
import {
  Field,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface CardFields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
}

interface Fields {
  cards: {
    CardsList: CardFields[];
  };
}

type ContentCarouselProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ContentCarouselDefaultComponent = (
  props: ContentCarouselProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <h1>ContentCarouselDefaultComponent</h1>
  </div>
);

export const Default = (props: ContentCarouselProps): JSX.Element => {
  return <ContentCarouselDefaultComponent {...props} />;
};
