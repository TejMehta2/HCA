import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
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
  const phKey = `CTAButton-${props.params.DynamicPlaceholderId}`;
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image</span>
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </div>
  );
};

export const Default = (props: HeaderWithImageProps): JSX.Element => {
  return <HeaderWithImageDefaultComponent {...props} />;
};
