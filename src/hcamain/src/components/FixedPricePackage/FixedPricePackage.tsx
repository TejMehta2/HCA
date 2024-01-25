import React from 'react';
import {
  Field,
  Text,
  RichText,
  Image,
  ImageFieldValue,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageFieldValue;
}

type FixedPricePackageProps = {
  params: { [key: string]: string };
  fields: Fields;
  rendering: ComponentRendering;
};

const FixedPricePackageDefaultComponent = (
  props: FixedPricePackageProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Fixed Price Package no datasource</span>
    </div>
  </div>
);

export const ImageLeft = (props: FixedPricePackageProps): JSX.Element => {
  const phKey = `fixed-price-package-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <FixedPricePackageDefaultComponent {...props} />;
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
      <br />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};

export const ImageRight = (props: FixedPricePackageProps): JSX.Element => {
  const phKey = `fixed-price-package-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <FixedPricePackageDefaultComponent {...props} />;
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
      <br />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
