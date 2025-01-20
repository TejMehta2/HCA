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
import TextButton from '@component-library/core-components/TextButton/TextButton';
import { MasonryCard } from '@component-library/site-components/MasonryCards/MasonryCards';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';

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

export const Default = (props: ServiceCardsProps): JSX.Element => {
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

  const headingTag = props.params?.HeadingTag || 'h2';

  return (
    <DynamicServiceCards
      id={componentAnchorId}
      title={
        (props.fields?.data?.item?.title?.jsonValue || isExperienceEditor) && (
          <Text
            tag={
              props.fields?.data?.item?.heading?.jsonValue ? 'p' : headingTag
            }
            variation={props.params?.HeadingSize || 'display-2'}
          >
            <JssText field={props.fields?.data?.item?.title?.jsonValue} />
          </Text>
        )
      }
      subtitle={
        (props.fields?.data?.item?.heading?.jsonValue ||
          isExperienceEditor) && (
          <Text tag={headingTag} variation="subheading-1">
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

/*****************************************Masonry Cards Variant*************************************************/
//https://www.getfishtank.com/insights/guide-to-headless-sitecore-sxa-variants-in-xm-cloud
//and re-use dynamic pattern of Service cards component

const DynamicMasonryCards = dynamic(
  () => import('@component-library/site-components/MasonryCards/MasonryCards'),
  {
    ssr: true,
  }
);

type MasonryCardsProps = {
  params?: Params;
  fields?: Fields;
};

const MasonryCardsComponent = (props: MasonryCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Masonry Cards. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const MasonryCards = (props: MasonryCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields?.data?.item) {
    return <MasonryCardsComponent {...props} />;
  }
  if (
    !props.fields?.data?.item?.services?.servicesList?.length &&
    !isExperienceEditor
  ) {
    return <></>;
  }

  //const headingTag = props.params?.HeadingTag || 'h2';
  return (
    <DynamicMasonryCards
    /* title={
        (props.fields?.data?.item?.title?.jsonValue || isExperienceEditor) && (
          <Text
            tag={
              props.fields?.data?.item?.heading?.jsonValue ? 'p' : headingTag
            }
            variation={props.params?.HeadingSize || 'display-2'}
          >
            <JssText field={props.fields?.data?.item?.title?.jsonValue} />
          </Text>
        )
      }
      subtitle={
        (props.fields?.data?.item?.heading?.jsonValue ||
          isExperienceEditor) && (
          <Text tag={headingTag} variation="subheading-1">
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
      }*/
    >
      <MasonryCard
        columns={6}
        rows={2}
        image={
          <Image
            src="/placeholders/masonry-1.jpg"
            alt=""
            width={4096}
            height={3072}
          />
        }
        title={
          <Text variation="display-3">Discover our world class facilities</Text>
        }
        copy={
          <Text variation="body-large">
            Your time with us is about more than expert treatment and
            state-of-the-art facilities. From beautiful rooms to luxurious
            bathrooms you’ll find spaces to relax and recuperate in your own
            time and at your own pace.
          </Text>
        }
        cta={
          <TextButton theme="light">
            <a href="#">
              <span>Take a virtual tour</span>
            </a>
          </TextButton>
        }
      />
      <MasonryCard
        columns={6}
        rows={1}
        image={
          <Image
            src="/placeholders/masonry-2.jpg"
            alt=""
            width={4096}
            height={2160}
          />
        }
        title={<Text variation="display-6">Pioneering treatments</Text>}
        cta={
          <TextButton theme="light">
            <a href="#">
              <span>Learn more</span>
            </a>
          </TextButton>
        }
      />
      <MasonryCard
        columns={3}
        rows={1}
        image={
          <Image
            src="/placeholders/masonry-3.jpg"
            alt=""
            width={4096}
            height={2730}
          />
        }
        title={<Text variation="display-6">Luxurious rooms</Text>}
        cta={
          <TextButton theme="light">
            <a href="#">
              <span>Learn more</span>
            </a>
          </TextButton>
        }
      />
      <MasonryCard
        columns={3}
        rows={1}
        image={
          <Image
            src="/placeholders/masonry-4.jpg"
            alt=""
            width={4096}
            height={2731}
          />
        }
        title={<Text variation="display-6">Seasonal menus</Text>}
        cta={
          <TextButton theme="light">
            <a href="#">
              <span>Learn more</span>
            </a>
          </TextButton>
        }
      />
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
    </DynamicMasonryCards>
  );
};
