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

type DiagnosisFields = {
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
      testAndScans?: {
        TestAndScansList?: DiagnosisFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      cTACardText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      id?: string;
      diagnosis?: {
        DiagnosisList?: DiagnosisFields[];
      };
    };
  };
}

type TestAndScansCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const TestAndScansCardsDefaultComponent = (
  props: TestAndScansCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">TestAndScansCards no datasource</span>
    </div>
  </div>
);

export const WithImage = (props: TestAndScansCardsProps): JSX.Element => {
  if (!props.fields) {
    return <TestAndScansCardsDefaultComponent {...props} />;
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
        {props.fields?.data?.item?.testAndScans?.TestAndScansList?.map(
          (testAndScan, index) => (
            <li key={index}>
              <JssText field={testAndScan?.abstractTitle?.value} />
              <br />
              <JssText field={testAndScan.title?.value} />
              <br />
              <JssText field={testAndScan.abstractText?.value} />
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <ul>
        {props.fields?.data?.contextItem?.diagnosis?.DiagnosisList?.map(
          (diagnosis, index) => (
            <li key={index}>
              <JssText field={diagnosis.abstractTitle?.value} />
              <br />
              <JssText field={diagnosis.abstractText?.value} />
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

export const WithoutImage = (props: TestAndScansCardsProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <TestAndScansCardsDefaultComponent {...props} />;
  }

  return <WithImage {...props} />;
};
