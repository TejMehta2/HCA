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
  Heading: Field<string>;
  Title: Field<string>;
  Icon: ImageField;
  CTALink: LinkField;
  CTACardText: Field<string>;
  pages: {
    PagesList: PagesFields[];
  };
}

type ContentCardsSliderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ContentCardsSliderDefaultComponent = (props: ContentCardsSliderProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Standard = (
  props: ContentCardsSliderProps
): JSX.Element => {
  return <ContentCardsSliderDefaultComponent {...props} />;
};
