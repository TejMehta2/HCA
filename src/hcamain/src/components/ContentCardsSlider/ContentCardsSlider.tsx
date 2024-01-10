import React from 'react';
import {
  Image as JssImage,
  Field,
  Link as JssLink,
  LinkField,
  ImageFieldValue,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import CardContent from '@component-library/components/CardContent/CardContent';
import { Theme } from '@component-library/foundation/Themes/Themes.types';
import { TextProps } from '@component-library/foundation/Text/Text.types';
import getSubheadingTag from 'lib/subheading-tag-getter';

type CTAIconFields = {
  svgMarkup: Field<string>;
};

interface PagesFields {
  title: Field<string>;
  description: Field<string>;
  image: ImageFieldValue;
  url: { path: string };
}

interface Fields {
  data: {
    item: {
      heading: { jsonValue: Field<string> };
      title: { jsonValue: Field<string> };
      cTAIcon: {
        Icon: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
      cTACardText: { jsonValue: Field<string> };
      pages: {
        PagesList: PagesFields[];
      };
    };
  };
}

type ContentCardsSliderProps = {
  params: {
    Theme: Theme; // TODO - this should reflect what CMS provides, not what FE consumes
    HeadingTag: keyof JSX.IntrinsicElements; // TODO - this should reflect what CMS provides, not what FE consumes
    HeadingSize: TextProps['variation']; // TODO - this should reflect what CMS provides, not what FE consumes
    styles: string;
  };
  fields: Fields;
};

const ContentCardsSliderDefaultComponent = (
  props: ContentCardsSliderProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <h1>ContentCardsSliderDefaultComponent</h1>
  </div>
);

export const Default = (props: ContentCardsSliderProps): JSX.Element => {
  if (!props.fields) {
    return <ContentCardsSliderDefaultComponent {...props} />;
  }

  return (
    <CarouselCards
      theme={props.params.Theme || 'F-HCA-White'}
      title={
        <Text
          tag={props.params.HeadingTag || 'h2'}
          variation={props.params.HeadingSize || 'display-4'}
        >
          {props.fields.data.item.title.jsonValue.value}
        </Text>
      }
      link={
        <JssLink field={props.fields.data.item.cTALink.jsonValue}>
          <RichText
            tag="span"
            field={{
              value: props.fields.data.item.cTALink.jsonValue.value.text,
            }}
          />
        </JssLink>
      }
    >
      {props.fields.data.item.pages.PagesList.map((cards, index) => (
        <CardContent
          key={index}
          image={
            cards.image?.src ? <JssImage field={cards.image} /> : undefined
          }
          title={
            <Text
              tag={getSubheadingTag(props.params.HeadingTag, 'h3')}
              variation="display-4"
            >
              {cards.title.value}
            </Text>
          }
          bodyCopy={
            cards.description ? (
              <Text tag="p" variation="body-large">
                <RichText tag="span" field={cards.description} />
              </Text>
            ) : undefined
          }
          link={
            <a href={cards.url.path}>
              <RichText
                tag="span"
                field={{
                  value: props.fields.data.item.cTACardText.jsonValue.value,
                }}
              />
            </a>
          }
        />
      ))}
    </CarouselCards>
  );
};
