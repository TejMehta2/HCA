import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  RichText,
  Image as JssImage,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import { Theme, HeadingSize, HeadingTag } from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageField;
}

export type ImageShortTextProps = {
  params?: {
    Theme?: Theme;
    HeadingTag?: HeadingTag;
    HeadingSize?: HeadingSize;
    DynamicPlaceholderId?: string;
    styles?: string;
  };
  rendering?: ComponentRendering;
  fields?: Fields;
};

const ImageShortTextDefaultComponent = (
  props: ImageShortTextProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Image Short Text please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

interface ImageLeftProps extends ImageShortTextProps {
  imageAlignment: 'left' | 'right';
}
export const ImageLeft = (props: ImageLeftProps): JSX.Element => {
  const { imageAlignment = 'left' } = props;
  const phKey = `image-short-text-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <ImageShortTextDefaultComponent {...props} />;
  }

  return (
    <>
      <ImageAndTextBlock
        theme={props.params?.Theme || 'A-HCA-White'}
        imageAlignment={imageAlignment}
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
          <RichText field={props.fields?.Text} />
        </Text>
      </ImageAndTextBlock>
    </>
  );
};

export const ImageRight = (props: ImageShortTextProps): JSX.Element => {
  if (!props.fields) {
    return <ImageShortTextDefaultComponent {...props} />;
  }
  return <ImageLeft {...props} imageAlignment={'right'} />;
};
