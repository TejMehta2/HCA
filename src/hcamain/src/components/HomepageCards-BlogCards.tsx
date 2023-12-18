import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface BlogTags {
  Title: Field<string>;
}

interface BlogFields {
  Date: Field<string>;
  Image: ImageField;
  Tags:{
    TagsList: BlogTags[];
  }
}

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Icon: ImageField;
  CTALink: LinkField;
  CardCTAText: Field<string>;
  stories: {
    BlogsList: BlogFields[];
  };
}

type HomepageCardsBlogCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomepageCardsBlogCardsDefaultComponent = (
  props: HomepageCardsBlogCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Carousel = (
  props: HomepageCardsBlogCardsProps
): JSX.Element => {
  return <HomepageCardsBlogCardsDefaultComponent {...props} />;
};

export const Standard = (
  props: HomepageCardsBlogCardsProps
): JSX.Element => {
  return <HomepageCardsBlogCardsDefaultComponent {...props} />;
};
