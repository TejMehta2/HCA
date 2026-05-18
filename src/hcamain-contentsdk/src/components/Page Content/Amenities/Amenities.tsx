import { type JSX } from 'react';

import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-content-sdk/nextjs';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Text from '@component-library/foundation/Text/Text';
import {
  iconList,
  imageAlignmentTypes,
} from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock.types';
import Params from 'src/types/params';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import { isInsideContainerComponent } from 'lib/utility-functions/insideContainerComponent';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type AmenitiesFields = {
  fields?: {
    Title?: Field<string>;
    Icon?: HCAIconFields;
  };
};

interface Fields {
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageField;
  AmenitiesList?: AmenitiesFields[];
}

type AmenitiesProps = {
  params?: Params;
  fields?: Fields;
};

const AmenitiesDefaultComponent = (props: AmenitiesProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">
        Homepage Service Cards - no datasource
      </span>
    </div>
  </div>
);

const outputAmenitiesList = (props: AmenitiesProps) => {
  const amenitiesList: iconList = [];

  props?.fields?.AmenitiesList?.map((item?: AmenitiesFields) => {
    amenitiesList.push({
      text: <JssText field={item?.fields?.Title} />,
      icon: (
        <SitecoreSvg>
          {item?.fields?.Icon?.fields?.SvgMarkup?.value}
        </SitecoreSvg>
      ),
    });
  });

  return amenitiesList;
};

const outputImageAndTextBlock = (
  props: AmenitiesProps,
  alignment: imageAlignmentTypes,
  componentAnchorId: string | undefined
) => {
  return (
    <ImageAndTextBlock
      id={componentAnchorId}
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      isInsideContainer={isInsideContainerComponent(props.params)}
      imageAlignment={alignment}
      length="short"
      header={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
      iconList={outputAmenitiesList(props)}
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
    >
      <Text tag="div" variation="body-large">
        <RichText>
          <JssRichText field={props.fields?.Text}></JssRichText>
        </RichText>
      </Text>
    </ImageAndTextBlock>
  );
};

export const ImageLeft = (props: AmenitiesProps): JSX.Element => {
  if (!props.fields) {
    return <AmenitiesDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  return outputImageAndTextBlock(props, 'left', componentAnchorId);
};

export const ImageRight = (props: AmenitiesProps): JSX.Element => {
  if (!props.fields) {
    return <AmenitiesDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );

  return outputImageAndTextBlock(props, 'right', componentAnchorId);
};

export const Default = ImageLeft;
