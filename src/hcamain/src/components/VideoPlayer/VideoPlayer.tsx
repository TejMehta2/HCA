import React from 'react';
import {
  Field,
  ImageFieldValue,
  Text as JssText,
  Image as JSSImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

type VideoProvidersFields = {
  name: string;
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  Platform: VideoProvidersFields;
  VideoUrl: Field<string>;
  VideoThumbnail: ImageFieldValue;
}

type VideoPlayerProps = {
  params: {
    [key: string]: string;
  };
  fields: Fields;
};

const VideoPlayerDefaultComponent = (props: VideoPlayerProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">VideoPlayer no datasource</span>
    </div>
  </div>
);

export const Default = (props: VideoPlayerProps): JSX.Element => {
  if (!props.fields) {
    return <VideoPlayerDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.Heading} />
      <br />
      <JssText field={props.fields.Title} />
      <br />
      <JssText field={props.fields.Text} />
      <br />
      <span>{props.fields.Platform?.name}</span>
      <br />
      <span>{props.fields.VideoUrl.value}</span>
      <br />
      <JSSImage field={props.fields.VideoThumbnail} />
      <br />
    </div>
  );
};
