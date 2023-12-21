import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface PagesFields {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  Link: LinkField;
  url: {
    path: Field<string>;
  };
}

interface Fields {
  Title: Field<string>;
  CTACardText: Field<string>;
  pages: {
    PagesList: PagesFields[];
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
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Default = (props: ContentCardsProps): JSX.Element => {
  return <ContentCardsDefaultComponent {...props} />;
};
