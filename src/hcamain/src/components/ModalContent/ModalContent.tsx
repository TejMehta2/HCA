import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  Link as JssLink,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  PrimaryCTAIcon: HCAIconFields;
  PrimaryCTA: LinkField;
  SecondaryCTAIcon: HCAIconFields;
  SecondaryCTA: LinkField;
}

type ModalContentProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ModalContentDefaultComponent = (
  props: ModalContentProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ModalContent no datasource</span>
    </div>
  </div>
);

export const Default = (props: ModalContentProps): JSX.Element => {
  if (!props.fields) {
    return <ModalContentDefaultComponent {...props} />;
  }

  return (
    <>
      <JssText field={props.fields.Title} />
      <br />
      <JssText field={props.fields.Text} />
      <br />
      <JssLink field={props.fields?.PrimaryCTA}>
        <>
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.PrimaryCTAIcon?.fields.SvgMarkup.value,
            }}
          ></span>
          <RichText
            tag="span"
            field={{
              value: props.fields.PrimaryCTA.value.text,
            }}
          />
        </>
      </JssLink>
      <br />
      <JssLink field={props.fields?.SecondaryCTA}>
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.SecondaryCTAIcon?.fields.SvgMarkup.value,
          }}
        ></span>
        <RichText
          tag="span"
          field={{
            value: props.fields.SecondaryCTA.value.text,
          }}
        />
      </JssLink>
    </>
  );
};
