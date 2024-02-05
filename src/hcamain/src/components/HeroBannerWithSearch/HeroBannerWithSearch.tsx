import React from 'react';
import {
  Field,
  ImageField,
  Image,
  RichText,
  Text,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface Fields {
  Title: Field<string>;
  Image: ImageField;
  SearchIcon: HCAIconFields;
  SearchPlaceholder: Field<string>;
  CTAHeading: Field<string>;
}

type HeroBannerWithSearchProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const HeroBannerWithSearchDefaultComponent = (
  props: HeroBannerWithSearchProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          HeroBannerWithSearch no datasource
        </span>
      </div>
    </div>
  );
};

export const Default = (props: HeroBannerWithSearchProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeroBannerWithSearchDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <br />
      <Image field={props.fields.Image} />
      <br />
      {props?.fields?.SearchIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props?.fields?.SearchIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <br />
      <RichText field={props.fields.SearchPlaceholder} />
      <br />
      <Text field={props.fields.CTAHeading} />
      <br />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
