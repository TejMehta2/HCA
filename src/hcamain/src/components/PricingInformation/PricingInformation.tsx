import React from 'react';
import {
  Field,
  Text as JssText,
  RichText,
  Placeholder,
  ComponentRendering,
  useSitecoreContext,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Image?: ImageField;
  PriceFrom?: Field<string>;
  Text?: Field<string>;
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
    <ImageAndTextBlock
      theme={props.params?.Theme || 'A-HCA-White'}
      length="long"
      imageAlignment="left"
      contentVariation="pricing"
      image={
        <NextJssImage
          field={props.fields?.Image}
          next={{
            width: 1000,
            height: 1000,
            sizes: '(max-width: 768px) 100vw, 50vw',
          }}
        />
      }
      subheader={
        <Text variation="subheading-1">
          <JssText field={props.fields?.Heading} />
        </Text>
      }
      header={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-2'}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
      children={
        <>
          <div>
            <Text tag="p" variation="subheading-2">
              <JssText field={props.fields?.PriceFromText} />
            </Text>
            <Text tag="p" variation="display-2">
              <JssText field={props.fields?.PriceFrom} />
            </Text>
            <Text tag="div" variation="body-large">
              <RichText field={props.fields?.Text} />
            </Text>
          </div>
          <div>
            <Text tag="p" variation="subheading-2">
              <JssText field={props.fields?.ConsultantFeeText} />
            </Text>
            <Text tag="p" variation="display-5">
              <JssText field={props.fields?.ConsultantFee} />
            </Text>
          </div>
          <div>
            <Text tag="p" variation="subheading-2">
              <JssText field={props.fields?.LengthOfStayText} />
            </Text>
            <Text tag="p" variation="display-5">
              <JssText field={props.fields?.LengthOfStay} />
            </Text>
          </div>
        </>
      }
      ctas={
        props.rendering && (
          <PlaceHolderWrapper>
            <Placeholder
              name={phKey}
              rendering={props.rendering}
              parentHeadingTag={props.params?.HeadingTag}
            />
          </PlaceHolderWrapper>
        )
      }
    />
  );
};
