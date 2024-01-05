import React from 'react';
import { Field, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';

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
    <div className={`component ${props.params.styles}`}>
      {props?.fields?.CTAIcon?.fields.SvgMarkup && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.CTAIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <a href={props.fields.CTALink.value.href}>
        <Text
          tag="span"
          field={{
            value: props.fields.CTALink.value.text,
          }}
        />
      </a>
    </div>
  );
};

export const Secondary = (props: CTAProps): JSX.Element => {
  return <CTADefaultComponent {...props} />;
};

export const LightText = (props: CTAProps): JSX.Element => {
  return <CTADefaultComponent {...props} />;
};
