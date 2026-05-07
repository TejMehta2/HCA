import React, { type JSX } from 'react';
import {
  Field,
  LinkField,
  RichText,
  Link as JssLink,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import TextButtonComponent from '@component-library/core-components/TextButton/TextButton';
import {
  ButtonProps,
  ButtonVariationUnionTypes,
} from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import { ComponentWithContextProps } from 'lib/component-props';

type CTAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

interface Fields {
  CTAIcon: CTAIconFields;
  CTALink: LinkField;
}

type CTAProps = ComponentWithContextProps & {
  params?: Params;
  fields: Fields;
  size?: ButtonProps['size'];
  contentVariation?: ButtonProps['contentVariation'];
};

const CTADefaultComponent = (props: CTAProps): JSX.Element => {
  const { page } = props;
  const isEditing = page.mode.isEditing;

  return !isEditing ? (
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
const IntegratedButton = (props: IntegratedButtonProps) => {
  const { page } = props;
  const isEditing = page.mode.isEditing;
  return (
    <Button
      variation={props.variation}
      size={props.size || 'large'}
      contentVariation={props.contentVariation}
    >
      <JssLink field={props.fields.CTALink}>
        {!isEditing && (
          <>
            {props?.fields?.CTAIcon && (
              <span
                dangerouslySetInnerHTML={{
                  __html: props.fields?.CTAIcon?.fields?.SvgMarkup?.value || '',
                }}
              />
            )}
            {props?.fields?.CTALink?.value?.text && (
              <RichText
                tag="span"
                field={{
                  value: props.fields?.CTALink?.value?.text,
                }}
              />
            )}
          </>
        )}
      </JssLink>
    </Button>
  );
};

export const Default = (props: CTAProps): JSX.Element => {
  if (!props.fields) {
    return <CTADefaultComponent {...props} />;
  }
  return <IntegratedButton {...props} variation="full" />;
};

export const Full = (props: CTAProps): JSX.Element => {
  if (!props.fields) {
    return <CTADefaultComponent {...props} />;
  }
  return <IntegratedButton {...props} variation="full" />;
};

export const Outline = (props: CTAProps): JSX.Element => {
  if (!props.fields) {
    return <CTADefaultComponent {...props} />;
  }
  return <IntegratedButton {...props} variation="outline" />;
};

export const TextButton = (props: CTAProps): JSX.Element => {
  const { page } = props;
  const isEditing = page.mode.isEditing;
  if (!props.fields) {
    return <CTADefaultComponent {...props} />;
  }
  return (
    <TextButtonComponent>
      <JssLink field={props.fields.CTALink}>
        {!isEditing && props.fields.CTALink?.value?.text && (
          <RichText
            tag="span"
            field={{
              value: props.fields.CTALink?.value?.text,
            }}
          />
        )}
      </JssLink>
    </TextButtonComponent>
  );
};
