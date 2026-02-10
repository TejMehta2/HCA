/* eslint-disable */
import React, { useRef } from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  RichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import ModalAppointment from '@component-library/components/ModalAppointment/ModalAppointment';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import StickyCTA from '@component-library/site-components/StickyCTA/StickyCTA';
import { ButtonVariationUnionTypes } from '@component-library/core-components/Button/Button.types';
import Link from 'next/link';
import { withKeywordIdIfNeeded } from 'lib/doctify-integration/withKeywordIdIfNeeded';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type ModalContentFields = {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    PrimaryCTAIcon?: HCAIconFields;
    PrimaryCTA?: LinkField;
    PrimaryCTAVariant?: { name: string };
    SecondaryCTAIcon?: HCAIconFields;
    SecondaryCTA?: LinkField;
    SecondaryCTAVariant?: { name: string };
    TertiaryCTAIcon?: HCAIconFields;
    TertiaryCTA?: LinkField;
    TertiaryCTAVariant?: { name: string };
    QuaternaryCTAIcon?: HCAIconFields;
    QuaternaryCTA?: LinkField;
    QuaternaryCTAVariant?: { name: string };
  };
};

interface Fields {
  CTAIcon?: HCAIconFields;
  CTAText?: Field<string>;
  DesktopCaption?: Field<string>;
  ModalContent?: ModalContentFields[];
}

type StickyCTAProps = {
  params?: Params;
  fields?: Fields;
};

type RouteFields = {
  DoctifyKeywordId?: Field<string>;
};

const StickyCTADefaultComponent = (props: StickyCTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Sticky CTA. Please click to select datasource.
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: StickyCTAProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { sitecoreContext } = useSitecoreContext();

  // context Item (route) item fields:
  const routeFields = sitecoreContext?.route?.fields as RouteFields | undefined;
  const contextDoctifyKeywordId = routeFields?.DoctifyKeywordId?.value;

  if (!props.fields) {
    return <StickyCTADefaultComponent {...props} />;
  }

  if (!props.fields?.ModalContent) return <></>;

  const firstModal = props.fields?.ModalContent?.[0]?.fields;
  const secondModal = props.fields?.ModalContent?.[1]?.fields;

  const items = [
    {
      link: firstModal?.PrimaryCTA,
      icon: firstModal?.PrimaryCTAIcon,
      buttonVariation: firstModal?.PrimaryCTAVariant?.name ?? 'full',
    },
    {
      link: firstModal?.SecondaryCTA,
      icon: firstModal?.SecondaryCTAIcon,
      buttonVariation: firstModal?.SecondaryCTAVariant?.name ?? 'outline',
    },
    {
      link: firstModal?.TertiaryCTA,
      icon: firstModal?.TertiaryCTAIcon,
      buttonVariation: firstModal?.TertiaryCTAVariant?.name ?? 'outline',
    },
    {
      link: firstModal?.QuaternaryCTA,
      icon: firstModal?.QuaternaryCTAIcon,
      buttonVariation: firstModal?.QuaternaryCTAVariant?.name ?? 'outline',
    },
  ];

  const items1 = [
    {
      link: secondModal?.PrimaryCTA,
      icon: secondModal?.PrimaryCTAIcon,
      buttonVariation: secondModal?.PrimaryCTAVariant?.name ?? 'full',
    },
    {
      link: secondModal?.SecondaryCTA,
      icon: secondModal?.SecondaryCTAIcon,
      buttonVariation: secondModal?.SecondaryCTAVariant?.name ?? 'outline',
    },
    {
      link: secondModal?.TertiaryCTA,
      icon: secondModal?.TertiaryCTAIcon,
      buttonVariation: secondModal?.TertiaryCTAVariant?.name ?? 'outline',
    },
    {
      link: secondModal?.QuaternaryCTA,
      icon: secondModal?.QuaternaryCTAIcon,
      buttonVariation: secondModal?.QuaternaryCTAVariant?.name ?? 'outline',
    },
  ];

  return (
    <>
      <StickyCTA
        cta={
          props?.fields?.CTAText?.value && (
            <Button size="large" variation="full">
              <button onClick={() => {
                dialogRef?.current?.showModal();
              }}>
                <>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props?.fields?.CTAIcon?.fields?.SvgMarkup?.value || '',
                    }}
                  ></span>
                  <RichText
                    tag="span"
                    field={{
                      value: props?.fields?.CTAText.value,
                    }}
                  />
                </>
              </button>
            </Button>
          )
        }
      >
        {props.fields.DesktopCaption?.value && (
          <Text variation="heading-1">
            {props.fields.DesktopCaption?.value}
          </Text>
        )}
      </StickyCTA>

      <ModalAppointment
        ref={dialogRef}
        title1={
          props.fields?.ModalContent?.[0] && (
            <Text variation={'display-4'} tag="h2">
              <JssText field={props.fields?.ModalContent?.[0]?.fields?.Title} />
            </Text>
          )
        }
        copy1={
          props.fields?.ModalContent?.[0] && (
            <Text variation={'body-large'} tag="div">
              <RichText field={props.fields?.ModalContent?.[0]?.fields?.Text} />
            </Text>
          )
        }
        cta1={
          props.fields?.ModalContent?.[0] && (
            <>
              {items.map(({ link, icon, buttonVariation }, idx) => {
                const text = link?.value?.text;
                if (!text) return null;

                const href = withKeywordIdIfNeeded(
                  link,
                  contextDoctifyKeywordId
                );

                return (
                  <Button
                    key={idx}
                    size="large"
                    contentVariation="full-width"
                    variation={
                      buttonVariation.toLowerCase() as ButtonVariationUnionTypes
                    }
                  >
                    <Link href={href} target={link.value.target}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: icon?.fields?.SvgMarkup?.value || '',
                        }}
                      />
                      <RichText tag="span" field={{ value: text }} />
                    </Link>
                  </Button>
                );
              })}
            </>
          )
        }
        title2={
          props.fields?.ModalContent?.[1] && (
            <Text variation={'display-4'} tag="h2">
              <JssText field={props.fields?.ModalContent?.[1]?.fields?.Title} />
            </Text>
          )
        }
        copy2={
          props.fields?.ModalContent?.[1] && (
            <Text variation={'body-large'} tag="div">
              <JssText field={props.fields?.ModalContent?.[1]?.fields?.Text} />
            </Text>
          )
        }
        cta2={
          props.fields?.ModalContent?.[1] && (
            <>
              {items1.map(({ link, icon, buttonVariation }, idx) => {
                const text = link?.value?.text;
                if (!text) return null;

                const href = withKeywordIdIfNeeded(
                  link,
                  contextDoctifyKeywordId
                );

                return (
                  <Button
                    key={idx}
                    size="large"
                    contentVariation="full-width"
                    variation={
                      buttonVariation.toLowerCase() as ButtonVariationUnionTypes
                    }
                  >
                    <Link href={href} target={link.value.target}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: icon?.fields?.SvgMarkup?.value || '',
                        }}
                      />
                      <RichText tag="span" field={{ value: text }} />
                    </Link>
                  </Button>
                );
              })}
            </>
          )
        }
      />
    </>
  );
};
