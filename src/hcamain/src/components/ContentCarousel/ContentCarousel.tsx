import React from 'react';
import {
  Field,
  ImageField,
  Text,
  RichText,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface CardFields {
  fields: {
    Title: Field<string>;
    Text: Field<string>;
    Image: ImageField;
  };
}

interface Fields {
  Cards: CardFields[];
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
  if (!props.fields) {
    return <ContentCarouselDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <ul>
        {props.fields.Cards.map((cards, index) => (
          <li key={index}>
            <Text field={cards.fields.Title} />
            <br />
            <RichText field={cards.fields.Text} />
            <br />
            <Image field={cards.fields.Image} />
          </li>
        ))}
      </ul>
    </div>
  );
};
