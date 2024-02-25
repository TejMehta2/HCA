import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as JssText,
  Image as JSSImage,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import { CQSStatusFields } from 'components/CQCRating/CQCRating.types';
import { DoctifyReviewsFields } from 'components/Doctify/Doctify.types';
import { Default as Doctify } from '../Doctify/Doctify';
import { Default as CQCRating } from '../CQCRating/CQCRating';

interface CQCFields {
  fields: {
    Title: Field<string>;
    Text: Field<string>;
    ReportLink: LinkField;
    Status: CQSStatusFields;
  };
}

interface Fields {
  data: {
    contextItem: {
      title: { jsonValue: Field<string> };
      image: { jsonValue: ImageField };
      city: { jsonValue: Field<string> };
      street: { jsonValue: Field<string> };
      postCode: { jsonValue: Field<string> };
      getDirections: { jsonValue: Field<string> };
      doctifyReviews: DoctifyReviewsFields;
      cQCRating: CQCFields;
    };
  };
}

type HeroLocationDetailsProps = {
  params: {
    [key: string]: string;
  };
  rendering: ComponentRendering;
  fields: Fields;
};

const HeroLocationDetailsDefaultComponent = (
  props: HeroLocationDetailsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">HeroLocationDetails no datasource</span>
    </div>
  </div>
);

export const Default = (props: HeroLocationDetailsProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeroLocationDetailsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.data.contextItem?.title.jsonValue} />
      <br />
      <JSSImage field={props.fields.data.contextItem?.image.jsonValue} />
      <br />
      <JssText field={props.fields.data?.contextItem?.city.jsonValue} />
      <br />
      <JssText field={props.fields.data?.contextItem?.street.jsonValue} />
      <br />
      <JssText field={props.fields.data?.contextItem?.postCode.jsonValue} />
      <br />
      <JssText field={props.fields.data?.contextItem?.getDirections.jsonValue} />
      <br />
      <span>DoctifyReviews</span>
      <br />
      <Doctify
            alignment="left"
            params={props.params}
            key={2}
            fields={{ Reviews: props.fields.data.contextItem.doctifyReviews }}
          />
      <CQCRating
            length="short"
            hideRating={true}
            {...props.fields.data.contextItem.cQCRating}
          />
      <PlaceHolderWrapper>
            <Placeholder name={phKey} rendering={props.rendering} />
          </PlaceHolderWrapper>
    </div>
  );
};
