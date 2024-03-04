import React from 'react';
import {
  Field,
  ImageFieldValue,
  Text as JssText,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import VideoBlock from '@component-library/site-components/VideoBlock/VideoBlock';
import VideoPlayer from '@component-library/components/VideoPlayer/VideoPlayer';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Button from '@component-library/core-components/Button/Button';
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
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

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
          // ctas={
          //   <>
          //     <Button size={'small'} variation={'full'}>
          //       <a href="#">
          //         <span>
          //           Learn more about <strong>self-pay</strong>
          //         </span>
          //       </a>
          //     </Button>
          //     <TextButton>
          //       <a href="#">
          //         <span>
          //           Access care with <strong>insurance</strong>
          //         </span>
          //       </a>
          //     </TextButton>
          //   </>
          // }
        />
      }
      video={
        <VideoPlayer
          videoUrl={props.fields?.VideoUrl?.value}
          overlayImage={<JssImage field={props.fields?.VideoThumbnail} />}
        />
      }
    ></VideoBlock>
    // <div className={`component ${props.params?.styles}`}>
    //   <JssText field={props.fields?.Heading} />
    //   <br />
    //   <JssText field={props.fields?.Title} />
    //   <br />
    //   <JssText field={props.fields?.Text} />
    //   <br />
    //   <span>{props.fields?.Platform?.name}</span>
    //   <br />
    //   <span>{props.fields?.VideoUrl?.value}</span>
    //   <br />
    //   <JssImage field={props.fields?.VideoThumbnail} />
    //   <br />
    // </div>
  );
};
