import React from 'react';
import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Icon: ImageField;
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
  return <CTADefaultComponent {...props} />;
};

export const Secondary = (props: CTAProps): JSX.Element => {
  return <CTADefaultComponent {...props} />;
};

export const LightText = (props: CTAProps): JSX.Element => {
  return <CTADefaultComponent {...props} />;
};
