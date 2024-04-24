import React from 'react';
import {
  Field,
  LinkField,
  RichText as JssRichText,
  Text as JssText,
  ImageField,
  Image as JssImage,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CardService from '@component-library/components/CardService/CardService';
import Text from '@component-library/foundation/Text/Text';
import ServiceCards from '@component-library/site-components/ServiceCards/ServiceCards';
import Params from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type ServiceFields = {
  fields?: {
    AbstractTitle?: Field<string>;
    AbstractText?: Field<string>;
    AbstractImage?: ImageField;
    Title?: Field<string>;
    Description?: Field<string>;
    Image?: ImageField;
  };

  url?: string;
  name?: string;
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Description?: Field<string>;
  CTAIcon?: HCAIconFields;
  CTALink: LinkField;
  CTACardText?: Field<string>;
  Services?: ServiceFields[];
}

type ServiceCardsProps = {
  params?: Params;
  fields?: Fields;
};

const ServiceCardsDefaultComponent = (
  props: ServiceCardsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Service Cards. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: ServiceCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <ServiceCardsDefaultComponent {...props} />;
  }

  return (
    <ServiceCards
      title={
        (props.fields.Title?.value || isExperienceEditor) && (
          <Text
            tag={getSubheadingTag(props.params?.HeadingTag, 'h2')}
            variation={props.params?.HeadingSize || 'display-2'}
          >
            <JssText field={props.fields?.Title} />
          </Text>
        )
      }
      subtitle={
        (props.fields.Heading?.value || isExperienceEditor) && (
          <Text tag="p" variation="subheading-1">
            <JssText field={props.fields?.Heading} />
          </Text>
        )
      }
      bodyText={<JssRichText field={props.fields?.Description} />}
      cta={
        isExperienceEditor ? (
          <JssLink field={props.fields?.CTALink}></JssLink>
        ) : (
          props.fields?.CTALink && (
            <JssLink field={props.fields?.CTALink.value}>
              {props?.fields?.CTAIcon && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.CTAIcon?.fields?.SvgMarkup?.value || '',
                  }}
                />
              )}
              {props?.fields?.CTALink?.value?.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.fields?.CTALink?.value?.text,
                  }}
                ></span>
              )}
            </JssLink>
          )
        )
      }
    >
      {props.fields?.Services &&
        props.fields?.Services.map((service, index) => (
          <CardService
            link={<a href={service.url}>{props?.fields?.CTACardText?.value}</a>}
            key={index}
          >
            {service.fields?.AbstractImage?.value?.src ? (
              <JssImage
                field={service?.fields?.AbstractImage}
                editable={false}
              />
            ) : (
              <JssImage field={service?.fields?.Image} editable={false} />
            )}
            <Text tag="div" variation="display-6">
              {service.fields?.AbstractTitle?.value ? (
                <JssText field={service?.fields?.AbstractTitle} />
              ) : (
                <JssText field={service?.fields?.Title} />
              )}
            </Text>
          </CardService>
        ))}
    </ServiceCards>
  );
};
