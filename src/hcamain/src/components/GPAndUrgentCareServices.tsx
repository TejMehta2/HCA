import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface TagsFields {
  Title: Field<string>;
}

interface PagesFields {
  Title: Field<string>;
  Description: Field<string>;
  Date: Field<string>;
  Image: ImageField;
  DoctifyPractice: Field<string>;
  tags: {
    TagsList: TagsFields[];
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

type GPAndUrgentCareServicesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const GPAndUrgentCareServicesDefaultComponent = (props: GPAndUrgentCareServicesProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Standard = (
  props: GPAndUrgentCareServicesProps
): JSX.Element => {
  return <GPAndUrgentCareServicesDefaultComponent {...props} />;
};
