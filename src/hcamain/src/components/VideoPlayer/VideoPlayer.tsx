import React from 'react';
import {
  Field,
  ImageFieldValue,
  Text as JssText,
  Image as JssImage,
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

type VideoProvidersFields = {
  name?: string;
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Platform?: VideoProvidersFields;
  VideoUrl?: Field<string>;
  VideoThumbnail?: ImageFieldValue;
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

  return (
    <VideoBlock
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          subtitle={
            <Text variation={'subheading-1'}>
              <JssText field={props.fields?.Heading} />
            </Text>
          }
          title={
            <Text
              tag={props.params?.HeadingTag || 'h2'}
              variation={props.params?.HeadingSize || 'display-2'}
            >
              <JssText field={props.fields?.Title} />
            </Text>
          }
          body={
            <Text variation={'body-large'}>
              <JssText field={props.fields?.Text} />
            </Text>
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
            overlayImage={<JssImage field={props.fields?.VideoThumbnail} />}
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

  return (
    <figure>
      {props.fields?.VideoUrl?.value ? (
        <VideoPlayer
          videoUrl={props.fields?.VideoUrl?.value}
          overlayImage={<JssImage field={props.fields?.VideoThumbnail} />}
        />
      ) : (
        <></>
      )}
    </figure>
  );
};
