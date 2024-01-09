import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text,
  RichText,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type ServiceFields = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    Link: LinkField;
  };
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Description: Field<string>;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  Services: ServiceFields[];
}

type ServiceCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ServiceCardsDefaultComponent = (
  props: ServiceCardsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Homepage Service Cards</span>
    </div>
  </div>
);

export const Default = (props: ServiceCardsProps): JSX.Element => {
  if (!props.fields) {
    return <ServiceCardsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <RichText field={props.fields.Description} />
      <br />
      {props?.fields?.CTAIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.CTAIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <Link field={props.fields.CTALink}></Link>
      <br />
      <span>
        <b>ServiceFields</b>
      </span>
      <br />
      <ul>
        {props.fields.Services.map((service, index) => (
          <li key={index}>
            <Text field={service.fields.Title} />
            <br />
            <RichText field={service.fields.Description} />
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
