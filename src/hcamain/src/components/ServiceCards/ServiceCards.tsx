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
import Params from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type ServiceFields = {
  fields?: {
    Title?: Field<string>;
    Description?: Field<string>;
    Image?: ImageFieldValue;
  };

  url?: string;
  name?: string;
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Description?: Field<string>;
  CTAIcon?: HCAIconFields;
  CTALink?: LinkField;
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
        props.fields?.CTALink && (
          <JssLink field={props.fields?.CTALink}>
            {isExperienceEditor ? (
              <></>
            ) : (
              <>
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
              </>
            )}
          </JssLink>
        )
      }
    >
      {props.fields?.Services &&
        props.fields?.Services.map((service, index) => (
          <CardService
            link={<a href={service.url}>{props?.fields?.CTACardText?.value}</a>}
            key={index}
          >
            <JssImage field={service?.fields?.Image} editable={false} />
            <Text tag="div" variation="display-6">
              <JssText field={service?.fields?.Title} editable={false} />
            </Text>
          </CardService>
        ))}
    </ServiceCards>
  );
};
