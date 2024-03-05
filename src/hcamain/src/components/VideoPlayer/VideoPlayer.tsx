import React from 'react';
import {
  Field,
  ImageFieldValue,
  Text as JssText,
<<<<<<< HEAD
  Image as JssImage,
=======
  Image as JSSImage,
>>>>>>> dev
  Placeholder,
  ComponentRendering,
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

const VideoPlayerDefaultComponent = (props: VideoPlayerProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">VideoPlayer no datasource</span>
    </div>
  </div>
);

export const Default = (props: VideoPlayerProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety

  if (!props.fields) {
    return <VideoPlayerDefaultComponent {...props} />;
  }

  if (!props.fields?.VideoUrl?.value) {
    return <></>;
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
              tag={props.params?.HeadingTag || 'h1'}
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
        <VideoPlayer
          videoUrl={props.fields?.VideoUrl?.value}
          overlayImage={<JssImage field={props.fields?.VideoThumbnail} />}
        />
      }
    ></VideoBlock>
  );
};
