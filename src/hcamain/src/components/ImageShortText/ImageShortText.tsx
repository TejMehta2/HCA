/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import dynamic from 'next/dynamic';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

const DynamicImageAndTextBlock = dynamic(
  () =>
    import(
      '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock'
    ),
  {
    ssr: true,
  }
);

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageField;
}

export type ImageShortTextProps = {
  params?: Params;
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

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const keepAspectRatio = props?.params?.KeepAspectRatio === '1';

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <>
      <DynamicImageAndTextBlock
        id={componentAnchorId}
        {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
        theme={props.params?.Theme || 'A-HCA-White'}
        imageAlignment={imageAlignment}
        imageKeepAspectRatio={keepAspectRatio}
        length="short"
        subheader={
          <Text tag={subheadingTag} variation="subheading-1">
            <JssText field={props.fields?.Heading} />
          </Text>
        }
        header={
          <>
            <Text
              tag={headingTag}
              variation={props.params?.HeadingSize || 'display-3'}
            >
              <JssText field={props.fields?.Title} />
            </Text>
          </>
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
      </DynamicImageAndTextBlock>
    </>
  );
};

export const ImageRight = (props: ImageShortTextProps): JSX.Element => {
  if (!props.fields) {
    return <ImageShortTextDefaultComponent {...props} />;
  }
  return <ImageLeft {...props} imageAlignment={'right'} />;
};
