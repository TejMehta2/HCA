import React from 'react';
import { Field, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import TextButtonComponent from '@component-library/core-components/TextButton/TextButton';
import {
  ButtonProps,
  ButtonVariationUnionTypes,
} from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

type CTAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

interface Fields {
  CTAIcon?: CTAIconFields;
  CTALink?: LinkField;
}

type CTAProps = {
  params?: Params;
  fields?: Fields;
  size?: ButtonProps['size'];
  contentVariation?: ButtonProps['contentVariation'];
};

const CTADefaultComponent = (props: CTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          CTA. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

interface IntegratedButtonProps extends CTAProps {
  variation: ButtonVariationUnionTypes;
}
const IntegratedButton = (props: IntegratedButtonProps) => (
  <Button
    variation={props.variation}
    size={props.size || 'large'}
    contentVariation={props.contentVariation}
  >
    <a href={props.fields?.CTALink?.value?.href}>
      {props.fields?.CTAIcon?.fields?.SvgMarkup && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields?.CTAIcon?.fields?.SvgMarkup?.value,
          }}
        />
      )}
      <RichText
        tag="span"
        field={{
          value: props.fields?.CTALink?.value?.text,
        }}
      />
    </a>
  </Button>
);

export const Full = (props: CTAProps): JSX.Element => {
  if (!props.fields) {
    return <CTADefaultComponent {...props} />;
  }
  return <IntegratedButton {...props} variation="full" />;
};

export const Outline = (props: CTAProps): JSX.Element => {
  return <IntegratedButton {...props} variation="outline" />;
};

export const TextButton = (props: CTAProps): JSX.Element => {
  return (
    <TextButtonComponent>
      <a href={props.fields?.CTALink?.value?.href}>
        <RichText
          tag="span"
          field={{
            value: props.fields?.CTALink?.value?.text,
          }}
        />
      </a>
    </TextButtonComponent>
  );
};
