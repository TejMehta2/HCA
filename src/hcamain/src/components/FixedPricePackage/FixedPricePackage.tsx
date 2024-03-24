import React from 'react';
import {
  Field,
  Text as JssText,
  RichText as JssRichText,
  Image as JssImage,
  ImageFieldValue,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Params from 'src/types/params';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageFieldValue;
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
  return (
    <>
      <ImageAndTextBlock
        theme={props.params?.Theme || 'A-HCA-White'}
        imageAlignment={props.imageAlignment}
        length="short"
        subheader={
          <Text tag="p" variation="subheading-1">
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
        image={<JssImage field={props.fields?.Image} />}
        ctas={
          props.rendering && (
            <PlaceHolderWrapper>
              <Placeholder name={phKey} rendering={props.rendering} />
            </PlaceHolderWrapper>
          )
        }
      >
        <Text tag="div" variation="body-large">
          <JssRichText field={props.fields?.Text} />
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
