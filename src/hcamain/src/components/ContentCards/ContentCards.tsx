import React from 'react';
import {
  Field,
  ImageField,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface PagesFields {
  title: Field<string>;
  description: Field<string>;
  Image: ImageField;
  link: { url: string };
  url: { path: string };
}

interface Fields {
  data: {
    item: {
      title: { jsonValue: Field<string> };
      cTACardText: { jsonValue: Field<string> };
      pages: {
        PagesList: PagesFields[];
      };
    };
  };
}

type ContentCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ContentCardsDefaultComponent = (
  props: ContentCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Content Cards no datasource</span>
    </div>
  </div>
);

export const Default = (props: ContentCardsProps): JSX.Element => {
  if (!props.fields) {
    return <ContentCardsDefaultComponent {...props} />;
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
