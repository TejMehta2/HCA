import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselContent from '@component-library/site-components/CarouselContent/CarouselContent';
import Text from '@component-library/foundation/Text/Text';
import { Theme } from '@component-library/foundation/Themes/Themes.types';
import { TextProps } from '@component-library/foundation/Text/Text.types';

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
  params: {
    Theme: Theme; // TODO - this should reflect what CMS provides, not what FE consumes
    HeadingTag: keyof JSX.IntrinsicElements; // TODO - this should reflect what CMS provides, not what FE consumes
    HeadingSize: TextProps['variation']; // TODO - this should reflect what CMS provides, not what FE consumes
    styles: string;
  };
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
    <>
      <CarouselContent
        theme={props.params.Theme}
        slides={props.fields.Cards.map((cards) => ({
          title: (
            <Text
              tag={props.params.HeadingTag}
              variation={props.params.HeadingSize}
            >
              <JssText tag={'span'} field={cards.fields.Title} />
            </Text>
          ),
          body: (
            <Text tag="p" variation="body-large">
              <JssRichText tag={'span'} field={cards.fields.Text} />
            </Text>
          ),
          image: <JssImage field={cards.fields.Image} />,
        }))}
      />
    </>
  );
};
