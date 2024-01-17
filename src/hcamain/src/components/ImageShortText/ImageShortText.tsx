import React from 'react';
import {
  Field,
  ImageField,
  Text,
  RichText,
  Image,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
}

export type ImageShortTextProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const ImageShortTextDefaultComponent = (
  props: ImageShortTextProps
): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ImageShortText no datasource</span>
    </div>
  </div>
);

export const ImageLeft = (props: ImageShortTextProps): JSX.Element => {
  const phKey = `image-short-text-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <ImageShortTextDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <RichText field={props.fields.Text} />
      <br />
      <Image field={props.fields.Image} />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};

export const ImageRight = (props: ImageShortTextProps): JSX.Element => {
  const phKey = `image-short-text-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <ImageShortTextDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <RichText field={props.fields.Text} />
      <br />
      <Image field={props.fields.Image} />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
