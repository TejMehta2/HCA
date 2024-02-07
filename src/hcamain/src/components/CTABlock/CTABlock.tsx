import React from 'react';
import {
  Field,
  RichText,
  Text,
  LinkField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
}

type CTABlockProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
  fields: Fields;
};

const CTABlockDefaultComponent = (props: CTABlockProps): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with text</span>
      </div>
    </div>
  );
};

export const Default = (props: CTABlockProps): JSX.Element => {
  if (!props.fields) {
    return <CTABlockDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <RichText field={props.fields.Text} />
      <br />
      <JssLink field={props.fields.CTALink}>
        {props?.fields?.CTAIcon && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.CTAIcon.fields.SvgMarkup.value,
            }}
          />
        )}
        {props?.fields?.CTALink.value.text && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.CTALink.value.text,
            }}
          ></span>
        )}
      </JssLink>
    </div>
  );
};
