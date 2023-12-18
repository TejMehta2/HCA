import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CTAIconFields = {
  SVGMarkup: Field<string>;
};

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
  data: {
    item: {
      Heading: Field<string>;
      Title: Field<string>;
      CTAIcon: {
        Icon: CTAIconFields[];
      };
      CTALink: LinkField;
      CTACardText: Field<string>;
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
    {/* <CarouselCards
      title={<Text field={props.fields.data.item.Title} />}
      link={<Link field={props.fields.data.item.CTALink} />}
    ></CarouselCards> */}
  </div>
);

export const Default = (props: ContentCardsSliderProps): JSX.Element => {
  return <ContentCardsSliderDefaultComponent {...props} />;
};
