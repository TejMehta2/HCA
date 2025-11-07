/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  LinkField,
  RichText as JssRichText,
  Text as JssText,
  ImageField,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CardService from '@component-library/components/CardService/CardService';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import RichText from '@component-library/core-components/RichText/RichText';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

const DynamicServiceCards = dynamic(
  () => import('@component-library/site-components/ServiceCards/ServiceCards'),
  {
    ssr: true,
  }
);

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

interface ServiceFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string };
  proxyurl?: { path?: string };
}

interface Fields {
  data?: {
    item?: {
      title?: { jsonValue?: Field<string> };
      description?: { jsonValue?: Field<string> };
      heading?: { jsonValue?: Field<string> };
      cTACardText?: { jsonValue?: Field<string> };
      services?: {
        servicesList?: ServiceFields[];
      };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
    };
  };
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

interface ServiceCardsPropsVariantProps extends ServiceCardsProps {
  variant?: 'role' | 'service';
}

export const Default = ({
  variant = 'service',
  ...props
}: ServiceCardsPropsVariantProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields?.data?.item) {
    return <ServiceCardsDefaultComponent {...props} />;
  }
  if (
    !props.fields?.data?.item?.services?.servicesList?.length &&
    !isExperienceEditor
  ) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.item?.heading?.jsonValue?.value
  );
  return (
    <DynamicServiceCards
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      contentVariation={variant}
      title={
        (props.fields?.data?.item?.title?.jsonValue || isExperienceEditor) && (
          <Text
            tag={headingTag}
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssText field={props.fields?.data?.item?.title?.jsonValue} />
          </Text>
        )
      }
      subtitle={
        (props.fields?.data?.item?.heading?.jsonValue ||
          isExperienceEditor) && (
          <Text tag={subheadingTag} variation="subheading-1">
            <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
          </Text>
        )
      }
      bodyText={
        <RichText>
          <JssRichText
            field={props.fields?.data?.item?.description?.jsonValue}
          />
        </RichText>
      }
      cta={
        isExperienceEditor ? (
          <JssLink
            field={props.fields?.data?.item?.cTALink?.jsonValue}
          ></JssLink>
        ) : (
          props.fields?.data?.item?.cTALink && (
            <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue}>
              <SitecoreSvg>
                {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value}
              </SitecoreSvg>
              {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTALink?.jsonValue?.value?.text,
                  }}
                ></span>
              )}
            </JssLink>
          )
        )
      }
    >
      {props.fields?.data?.item?.services?.servicesList?.map(
        (service, index) => {
          const cardCtaUrl = service?.proxyurl?.path
            ? service?.proxyurl?.path
            : service?.url?.path;

          return (
            <CardService
              link={
                cardCtaUrl ? (
                  <a href={cardCtaUrl}>
                    <JssRichText
                      tag="span"
                      field={props.fields?.data?.item?.cTACardText?.jsonValue}
                    />
                  </a>
                ) : (
                  <></>
                )
              }
              key={index}
            >
              {service.abstractImage?.jsonValue.value?.src &&
                service.abstractImage?.jsonValue.value?.class !==
                'scEmptyImage' ? (
                <Image
                  src={service?.abstractImage.jsonValue?.value?.src || ''}
                  alt={
                    (service?.abstractImage.jsonValue?.value?.alt as string) ||
                    ''
                  }
                  width="313"
                  height="317"
                />
              ) : (
                <Image
                  src={service?.image?.jsonValue?.value?.src || ''}
                  alt={(service?.image?.jsonValue?.value?.alt as string) || ''}
                  width="313"
                  height="317"
                />
              )}
              <Text tag="div" variation="display-6">
                {service.abstractTitle?.value ? (
                  <JssText field={service.abstractTitle} />
                ) : (
                  <JssText field={service.title} />
                )}
              </Text>
            </CardService>
          );
        }
      )}
    </DynamicServiceCards>
  );
};

export const Secondary = (
  props: ServiceCardsPropsVariantProps
): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <ServiceCardsDefaultComponent {...props} />;
  }

  return <Default {...props} variant="role" />;
};
