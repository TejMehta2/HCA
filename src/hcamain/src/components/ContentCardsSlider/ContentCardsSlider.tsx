import React from 'react';
import {
  Field,
  Link as JssLink,
  LinkField,
  ImageField,
  Text as JSSText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import CardContent from 'temp/component-library/components/CardContent/CardContent';
import { Theme } from '@component-library/foundation/Themes/Themes.types';
import { TextProps } from '@component-library/foundation/Text/Text.types';

type CTAIconFields = {
  svgMarkup: Field<string>;
};

interface PagesFields {
  title: Field<string>;
  description: Field<string>;
  image: ImageField;
  link: { url: string };
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
  console.log(props);
  return (
    <CarouselCards
      title={<span>{props.fields.data.item.title.jsonValue.value}</span>}
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
          title={
            <Text tag={props.params.HeadingTag} variation="display-4">
              {cards.title.value}
            </Text>
          }
          bodyCopy={
            <Text tag="p" variation="body-large">
              {cards.description.value}
            </Text>
          }
          link={
            !cards.link ? (
              <a href={cards.url.path}>
                <RichText
                  tag="span"
                  field={{
                    value: props.fields.data.item.cTACardText.jsonValue.value,
                  }}
                />
              </a>
            ) : (
              <a href={cards.link.url}>
                <RichText
                  tag="span"
                  field={{
                    value: props.fields.data.item.cTACardText.jsonValue.value,
                  }}
                />
              </a>
            )
          }
        />
      ))}
    </CarouselCards>
  );
};

{
  /* <div className={`component ${props.params.styles}`}>
  <Text field={props.fields.data.item.title.jsonValue} />
  <br />
  <Text field={props.fields.data.item.cTACardText.jsonValue} />
  <ul>
    {props.fields.data.item.pages.PagesList.map((cards, index) => (
      <li key={index}>
        <Text field={cards.title} />
        <br />
        <RichText tag="span" field={cards.description} />
        <br />
        {!cards.link ? (
          <a href={cards.url.path}>Link</a>
        ) : (
          <a href={cards.link.url}>Url</a>
        )}
      </li>
    ))}
  </ul>
</div>; */
}
