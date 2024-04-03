import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JssImage,
  RichText,
  ImageFieldValue,
  Placeholder,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Image?: ImageFieldValue;
  PriceFrom?: Field<string>;
  Description?: Field<string>;
  ConsultantFee?: Field<string>;
  LengthOfStay?: Field<string>;
  PriceFromText?: Field<string>;
  ConsultantFeeText?: Field<string>;
  LengthOfStayText?: Field<string>;
}

type PricingInformationProps = {
  params?: Params;
  rendering: ComponentRendering;
  fields?: Fields;
};

const PricingInformationDefaultComponent = (
  props: PricingInformationProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Pricing Information please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: PricingInformationProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <PricingInformationDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.Heading} />
      <br />
      <JssText field={props.fields?.Title} />
      <br />
      <JssText field={props.fields?.PriceFrom} />
      <br />
      <JssImage field={props.fields?.Image} />
      <br />
      <RichText tag="span" field={props.fields?.Description} />
      <br />
      <JssText field={props.fields?.ConsultantFee} />
      <br />
      <JssText field={props.fields?.LengthOfStay} />
      <br />
      <JssText field={props.fields?.PriceFromText} />
      <br />
      <JssText field={props.fields?.ConsultantFeeText} />
      <br />
      <JssText field={props.fields?.LengthOfStayText} />

      <PlaceHolderWrapper>
        <Placeholder name={phKey} rendering={props.rendering} />
      </PlaceHolderWrapper>
    </div>
  );
};
