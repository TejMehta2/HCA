/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Text as JssText,
  RichText as JssRichText,
  ImageField,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Params from 'src/types/params';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageField;
}

type FixedPricePackageProps = {
  params?: Params;
  fields?: Fields;
  rendering?: ComponentRendering;
};

const FixedPricePackageDefaultComponent = (
  props: FixedPricePackageProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Fixed Price Package no datasource</span>
    </div>
  </div>
);

interface IntegratedFixedPricedPackageProps extends FixedPricePackageProps {
  imageAlignment: 'left' | 'right';
}
const IntegratedFixedPricedPackage = (
  props: IntegratedFixedPricedPackageProps
) => {
  if (!props.fields) {
    return <FixedPricePackageDefaultComponent {...props} />;
  }
  const phKey = `fixed-price-package-${props.params?.DynamicPlaceholderId}`;

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <>
      <ImageAndTextBlock
        id={componentAnchorId}
        {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
        theme={props.params?.Theme || 'A-HCA-White'}
        imageAlignment={props.imageAlignment}
        length="short"
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
        ctas={
          props.rendering && (
            <PlaceHolderWrapper>
              <Placeholder name={phKey} rendering={props.rendering} />
            </PlaceHolderWrapper>
          )
        }
      >
        <Text tag="div" variation="body-large">
          <RichText>
            <JssRichText field={props.fields?.Text} />
          </RichText>
        </Text>
      </ImageAndTextBlock>
    </>
  );
};

export const ImageLeft = (props: FixedPricePackageProps): JSX.Element => (
  <IntegratedFixedPricedPackage {...props} imageAlignment="left" />
);

export const ImageRight = (props: FixedPricePackageProps): JSX.Element => (
  <IntegratedFixedPricedPackage {...props} imageAlignment="right" />
);
