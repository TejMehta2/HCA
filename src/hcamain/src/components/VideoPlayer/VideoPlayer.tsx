import React from 'react';
import {
  Field,
  ImageFieldValue,
  Text as JssText,
  Image as JSSImage,
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

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
  if (!props.fields) {
    return <VideoPlayerDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.Heading} />
      <br />
      <JssText field={props.fields?.Title} />
      <br />
      <JssText field={props.fields?.Text} />
      <br />
      <span>{props.fields?.Platform?.name}</span>
      <br />
      <span>{props.fields?.VideoUrl?.value}</span>
      <br />
      <JSSImage field={props.fields?.VideoThumbnail} />
      <br />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
