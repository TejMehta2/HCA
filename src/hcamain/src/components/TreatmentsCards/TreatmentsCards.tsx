import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text as JssText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type TreatmentsFields = {
  abstractTitle?: { value?: Field<string> };
  abstractText?: { value?: Field<string> };
  abstractImage?: { value?: ImageField };
  title?: { value?: Field<string> };
  text?: { value?: Field<string> };
  image?: { jsonValue?: ImageField };
  url?: string;
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      treatments?: {
        TreatmentsList?: TreatmentsFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      cTACardText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      id?: string;
      treatments?: {
        TreatmentsList?: TreatmentsFields[];
      };
    };
  };
}

type TreatmentsCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const TreatmentsCardsDefaultComponent = (
  props: TreatmentsCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">TreatmentsCards no datasource</span>
    </div>
  </div>
);

export const WithImage = (props: TreatmentsCardsProps): JSX.Element => {
  if (!props.fields) {
    return <TreatmentsCardsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props?.fields?.data?.item?.heading?.jsonValue} />
      <br />
      <JssText field={props?.fields?.data?.item?.title?.jsonValue} />
      <br />
      <RichText tag="span" field={props?.fields?.data?.item?.text?.jsonValue} />
      <br />
      <span></span>
      <br />
      <ul>
        {props.fields?.data?.item?.treatments?.TreatmentsList?.map(
          (treatment, index) => (
            <li key={index}>
              <JssText field={treatment.abstractTitle?.value?.value} />
              <br />
              <JssText field={treatment.title?.value} />
              <br />
              <JssText field={treatment.abstractText?.value} />
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <ul>
        {props.fields?.data?.contextItem?.treatments?.TreatmentsList?.map(
          (treatment, index) => (
            <li key={index}>
               <JssText field={treatment.abstractTitle?.value} />
              <br />
              <JssText field={treatment.title?.value} />
              <br />
              <JssText field={treatment.abstractText?.value} />
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <JssText field={props.fields?.data?.item?.numberOfCards?.jsonValue} />
      <br />
      <JssText field={props.fields?.data?.item?.cTACardText?.jsonValue} />
    </div>
  );
};

export const WithoutImage = (props: TreatmentsCardsProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <TreatmentsCardsDefaultComponent {...props} />;
  }

  return <WithImage {...props} />;
};
