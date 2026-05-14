import { type JSX } from 'react';
import componentMap from '.sitecore/component-map';
import {
  Field,
  Text as JssText,
  RichText,
  AppPlaceholder,
  ComponentRendering,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

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

type PricingInformationProps = ComponentWithContextProps & {
  params?: Params;
  rendering: ComponentRendering;
  fields?: Fields;
};

const PricingInformationDefaultComponent = (
  props: PricingInformationProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
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

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <ImageAndTextBlock
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
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
        <Text tag={subheadingTag} variation="subheading-1">
          <JssText field={props.fields?.Heading} />
        </Text>
      }
      header={
        <Text
          tag={headingTag}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
      ctas={
        props.rendering && (
          <PlaceHolderWrapper>
            <AppPlaceholder
              name={phKey}
              rendering={props.rendering}
              page={props.page}
              componentMap={componentMap}
              passThroughComponentProps={{
                parentHeadingTag: props.params?.HeadingTag,
              }}
            />
          </PlaceHolderWrapper>
        )
      }
    >
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
    </ImageAndTextBlock>
  );
};
