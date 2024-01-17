import React from 'react';
import {
  Field,
  LinkField,
  RichText as JssRichText,
  Text as JssText,
  ImageFieldValue,
  Image as JssImage,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CardService from '@component-library/components/CardService/CardService';
import Text from '@component-library/foundation/Text/Text';
import ServiceCards from '@component-library/site-components/ServiceCards/ServiceCards';
import { HeadingTag, HeadingSize } from 'src/types/params';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type ServiceFields = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageFieldValue;
  };

  url: string;
  name: string;
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Description: Field<string>;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  CTACardText: Field<string>;
  Services: ServiceFields[];
}

type ServiceCardsProps = {
  params: {
    [key: string]: string;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
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
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <ServiceCardsDefaultComponent {...props} />;
  }

  return (
    <ServiceCards
      title={
        isExperienceEditor ? (
          <JssText field={props.fields.Title} />
        ) : (
          <Text
            variation={props.params.HeadingSize || 'display-2'}
            tag={props.params.HeadingTag || 'h2'}
          >
            <JssText field={props.fields.Title} />
          </Text>
        )
      }
      subtitle={
        isExperienceEditor ? (
          <JssText field={props.fields.Heading} />
        ) : (
          <Text variation="subheading-1">
            <JssText field={props.fields.Heading} />
          </Text>
        )
      }
      bodyText={<JssRichText field={props.fields.Description} />}
      cta={
        isExperienceEditor ? (
          <JssLink field={props.fields.CTALink.value}></JssLink>
        ) : (
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
        )
      }
    >
      {props.fields.Services &&
        props.fields.Services.map((service, index) => (
          <CardService
            link={<a href={service.url}>{props.fields.CTACardText.value}</a>}
            key={index}
          >
            <JssImage field={service.fields.Image} />
            <Text tag="div" variation="display-6">
              <JssText field={service.fields.Title} />
            </Text>
          </CardService>
        ))}
    </ServiceCards>
  );
};
