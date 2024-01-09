import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
  RichText,
  Text,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
}

type HeaderWithImageProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const HeaderWithImageDefaultComponent = (
  props: HeaderWithImageProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: HeaderWithImageProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeaderWithImageDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <RichText field={props.fields.Text} />
      <Image field={props.fields.Image} />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
