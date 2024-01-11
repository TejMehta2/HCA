import React from 'react';
import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
}

export type ImageShortTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageShortTextDefaultComponent = (
  props: ImageShortTextProps
): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const ImageLeft = (props: ImageShortTextProps): JSX.Element => {
  return <ImageShortTextDefaultComponent {...props} />;
};

export const ImageRight = (props: ImageShortTextProps): JSX.Element => {
  return <ImageShortTextDefaultComponent {...props} />;
};
