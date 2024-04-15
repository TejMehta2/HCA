import React, { useRef } from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  Link as JssLink,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import ModalAppointment from '@component-library/components/ModalAppointment/ModalAppointment';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';

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
    SecondaryCTAIcon?: HCAIconFields;
    SecondaryCTA?: LinkField;
  };
};

interface Fields {
  CTAIcon?: HCAIconFields;
  CTAText?: Field<string>;
  ModalContent?: ModalContentFields[];
}

type BookAnAppointmentCTAProps = {
  params?: Params;
  fields?: Fields;
};

const BookAnAppointmentCTADefaultComponent = (
  props: BookAnAppointmentCTAProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BookAnAppointmentCTA no datasource</span>
    </div>
  </div>
);

export const Default = (props: BookAnAppointmentCTAProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!props.fields) {
    return <BookAnAppointmentCTADefaultComponent {...props} />;
  }

  if (!props.fields?.ModalContent) return <></>;

  return (
    <>
      <Button size="large" variation="full">
        <button onClick={() => dialogRef?.current?.showModal()}>
          {props?.fields?.CTAText?.value && (
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
          )}
        </button>
      </Button>

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
            <Text variation={'body-large'}>
              <JssText field={props.fields?.ModalContent?.[0]?.fields?.Text} />
            </Text>
          )
        }
        cta1={
          props.fields?.ModalContent?.[0] && (
            <>
              {props.fields?.ModalContent?.[0]?.fields?.PrimaryCTA?.value
                ?.text && (
                <Button
                  size={'large'}
                  contentVariation={'full-width'}
                  variation={'full'}
                >
                  <JssLink
                    field={props.fields?.ModalContent?.[0]?.fields?.PrimaryCTA}
                  >
                    <>
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            props?.fields?.ModalContent?.[0]?.fields
                              ?.PrimaryCTAIcon?.fields?.SvgMarkup?.value || '',
                        }}
                      ></span>
                      <RichText
                        tag="span"
                        field={{
                          value:
                            props.fields?.ModalContent?.[0]?.fields?.PrimaryCTA
                              .value?.text,
                        }}
                      />
                    </>
                  </JssLink>
                </Button>
              )}

              {props.fields?.ModalContent?.[0] &&
                props.fields?.ModalContent?.[0]?.fields?.SecondaryCTA?.value
                  ?.text && (
                  <Button
                    size={'large'}
                    contentVariation={'full-width'}
                    variation={'outline'}
                  >
                    <JssLink
                      field={
                        props.fields?.ModalContent?.[0]?.fields?.SecondaryCTA
                      }
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            props.fields?.ModalContent?.[0]?.fields
                              ?.SecondaryCTAIcon?.fields?.SvgMarkup?.value ||
                            '',
                        }}
                      ></span>
                      <RichText
                        tag="span"
                        field={{
                          value:
                            props.fields?.ModalContent?.[0]?.fields
                              ?.SecondaryCTA?.value?.text,
                        }}
                      />
                    </JssLink>
                  </Button>
                )}
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
            <Text variation={'body-large'}>
              <JssText field={props.fields?.ModalContent?.[1]?.fields?.Text} />
            </Text>
          )
        }
        cta2={
          props.fields?.ModalContent?.[1] && (
            <>
              {props.fields?.ModalContent?.[1]?.fields?.PrimaryCTA?.value
                ?.text && (
                <Button
                  size={'large'}
                  contentVariation={'full-width'}
                  variation={'full'}
                >
                  <JssLink
                    field={props.fields?.ModalContent?.[1]?.fields?.PrimaryCTA}
                  >
                    <>
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            props.fields?.ModalContent?.[1]?.fields
                              ?.PrimaryCTAIcon?.fields?.SvgMarkup?.value || '',
                        }}
                      ></span>
                      <RichText
                        tag="span"
                        field={{
                          value:
                            props.fields?.ModalContent?.[1]?.fields?.PrimaryCTA
                              .value?.text,
                        }}
                      />
                    </>
                  </JssLink>
                </Button>
              )}
              {props.fields?.ModalContent?.[1]?.fields?.SecondaryCTA?.value
                ?.text && (
                <Button
                  size={'large'}
                  contentVariation={'full-width'}
                  variation={'outline'}
                >
                  <JssLink
                    field={
                      props.fields?.ModalContent?.[1]?.fields?.SecondaryCTA
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          props.fields?.ModalContent?.[1]?.fields
                            ?.SecondaryCTAIcon?.fields?.SvgMarkup?.value || '',
                      }}
                    ></span>
                    <RichText
                      tag="span"
                      field={{
                        value:
                          props.fields?.ModalContent?.[1]?.fields?.SecondaryCTA
                            ?.value?.text,
                      }}
                    />
                  </JssLink>
                </Button>
              )}
            </>
          )
        }
      />
    </>
  );
};
