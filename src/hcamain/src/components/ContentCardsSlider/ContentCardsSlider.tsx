import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text,
  RichText
} from '@sitecore-jss/sitecore-jss-nextjs';

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
      cTACardText: { jsonValue: Field<string>};
      pages: {
        PagesList: PagesFields[];
      };
    };
  };
}

type ContentCardsSliderProps = {
  params: { [key: string]: string };
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
    <div className={`component ${props.params.styles}`}>
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
    </div>
  );
};
