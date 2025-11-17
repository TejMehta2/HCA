/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  RichText as JssRichText,
  Placeholder,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import VideoBlock from '@component-library/site-components/VideoBlock/VideoBlock';
import VideoPlayer from '@component-library/components/VideoPlayer/VideoPlayer';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Text from '@component-library/foundation/Text/Text';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import RichText from '@component-library/core-components/RichText/RichText';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

type VideoProvidersFields = {
  name?: string;
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Platform?: VideoProvidersFields;
  VideoUrl?: Field<string>;
  VideoThumbnail?: ImageField;
}

type VideoPlayerProps = {
  params?: Params;
  rendering: ComponentRendering;
  fields?: Fields;
};

const VideoPlayerDefaultComponent = (props: VideoPlayerProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Video Player please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: VideoPlayerProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety

  if (!props.fields) {
    return <VideoPlayerDefaultComponent {...props} />;
  }

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
    <VideoBlock
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize={'none'}
          subtitle={
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JssText field={props.fields?.Heading} />
            </Text>
          }
          title={
            <Text
              tag={headingTag}
              variation={props.params?.HeadingSize || 'display-3'}
            >
              <JssText field={props.fields?.Title} />
            </Text>
          }
          body={
            <RichText>
              <JssRichText tag="div" field={props.fields?.Text}></JssRichText>
            </RichText>
          }
          ctas={
            props.rendering && (
              <Placeholder
                name={phKey}
                rendering={props.rendering}
                size={buttonSize}
              />
            )
          }
        />
      }
      video={
        props.fields?.VideoUrl?.value ? (
          <VideoPlayer
            videoUrl={props.fields?.VideoUrl.value}
            overlayImage={
              <NextJssImage
                field={props.fields?.VideoThumbnail}
                next={{
                  width: 2000,
                  height: 2000,
                  sizes: '(max-width: 768px) 100vw, 90vw',
                }}
              />
            }
          />
        ) : (
          <></>
        )
      }
    ></VideoBlock>
  );
};

export const NoHeader = (props: VideoPlayerProps): JSX.Element => {
  if (!props.fields) {
    return <VideoPlayerDefaultComponent {...props} />;
  }
  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  return (
    <figure
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      {...(tableOfContentTitle ? { 'data-subnav-link-title': tableOfContentTitle } : {})}
      {...(tableOfContentTitle ? { 'data-subnav-link-id': componentAnchorId } : {})}>
      {props.fields?.VideoUrl?.value ? (
        <VideoPlayer
          videoUrl={props.fields?.VideoUrl?.value}
          overlayImage={
            <NextJssImage
              field={props.fields?.VideoThumbnail}
              next={{
                width: 2000,
                height: 2000,
                sizes: '(max-width: 768px) 100vw, 90vw',
              }}
            />
          }
        />
      ) : (
        <></>
      )}
    </figure>
  );
};

export const SideBySide = (props: VideoPlayerProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety

  if (!props.fields) {
    return <VideoPlayerDefaultComponent {...props} />;
  }

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
    <VideoBlock
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      variation="side-by-side"
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize={'none'}
          subtitle={
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JssText field={props.fields?.Heading} />
            </Text>
          }
          title={
            <Text
              tag={headingTag}
              variation={props.params?.HeadingSize || 'display-3'}
            >
              <JssText field={props.fields?.Title} />
            </Text>
          }
          body={
            <RichText>
              <JssRichText tag="div" field={props.fields?.Text}></JssRichText>
            </RichText>
          }
          ctas={
            props.rendering && (
              <Placeholder
                name={phKey}
                rendering={props.rendering}
                size={buttonSize}
              />
            )
          }
        />
      }
      video={
        props.fields?.VideoUrl?.value ? (
          <VideoPlayer
            videoUrl={props.fields?.VideoUrl.value}
            overlayImage={
              <NextJssImage
                field={props.fields?.VideoThumbnail}
                next={{
                  width: 2000,
                  height: 2000,
                  sizes: '(max-width: 768px) 100vw, 90vw',
                }}
              />
            }
          />
        ) : (
          <></>
        )
      }
    ></VideoBlock>
  );
};
