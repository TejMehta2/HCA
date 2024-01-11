import React from 'react';
import { Field, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import {
  ButtonProps,
  ButtonThemeUnionTypes,
} from '@component-library/core-components/Button/Button.types';

type CTAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface Fields {
  CTAIcon: CTAIconFields;
  CTALink: LinkField;
}

type CTAProps = {
  params: { [key: string]: string };
  fields: Fields;
  size: ButtonProps['size'];
};

const CTADefaultComponent = (props: CTAProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

const createCTA = (props: CTAProps, theme: ButtonThemeUnionTypes) => (
  <Button theme={theme} size={props.size || 'large'}>
    <a href={props.fields.CTALink.value.href}>
      {props?.fields?.CTAIcon?.fields.SvgMarkup && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.CTAIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <RichText
        tag="span"
        field={{
          value: props.fields.CTALink.value.text,
        }}
      />
    </a>
  </Button>
);

export const Full = (props: CTAProps): JSX.Element => {
  if (!props.fields) {
    return <CTADefaultComponent {...props} />;
  }
  return createCTA(props, 'full');
};

export const Outline = (props: CTAProps): JSX.Element => {
  return createCTA(props, 'outline');
};

export const LightText = (props: CTAProps): JSX.Element => {
  return <CTADefaultComponent {...props} />;
};
