import React from 'react';
import { Field, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';

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
};

const CTADefaultComponent = (props: CTAProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Primary = (props: CTAProps): JSX.Element => {
  console.log(props.fields);
  if (!props.fields) {
    return <CTADefaultComponent {...props} />;
  }
  return (
    <Button theme="full" size="large">
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
};

export const Secondary = (props: CTAProps): JSX.Element => {
  return (
    <Button theme="outline" size="large">
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
};

export const LightText = (props: CTAProps): JSX.Element => {
  return <CTADefaultComponent {...props} />;
};
