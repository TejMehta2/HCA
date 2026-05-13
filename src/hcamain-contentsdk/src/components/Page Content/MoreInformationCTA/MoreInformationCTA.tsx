'use client';

import { type JSX, useRef } from 'react';
import {
  Field,
  Text as JssText,
  RichText as JssRichText,
  Link as JssLink,
  LinkFieldValue,
} from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';
import Button from '@component-library/core-components/Button/Button';
import ModalText from '@component-library/components/ModalText/ModalText';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type ModalContentFields = {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    CTAIcon?: HCAIconFields;
    CTALink?: { value: LinkFieldValue };
  };
};

interface Fields {
  CTAIcon?: HCAIconFields;
  CTALink?: { value: LinkFieldValue };
  ModalContent?: ModalContentFields[];
}

type MoreInformationCTAProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  parentHeadingTag: Params['HeadingTag'];
};

const MoreInformationCTADefaultComponent = (
  props: MoreInformationCTAProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            More Information CTA please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: MoreInformationCTAProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isExperienceEditor = props.page.mode.isEditing;

  if (!props.fields) {
    return <MoreInformationCTADefaultComponent {...props} />;
  }

  if (!props.fields?.ModalContent) return <></>;

  return (
    <>
      <Button size="large" variation="full">
        <button onClick={() => dialogRef?.current?.showModal()}>
          {props?.fields?.CTALink?.value && (
            <>
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    props?.fields?.CTAIcon?.fields?.SvgMarkup?.value || '',
                }}
              ></span>
              <JssRichText
                tag="span"
                field={{
                  value: props?.fields?.CTALink?.value.text,
                }}
              />
            </>
          )}
        </button>
      </Button>
      <ModalText
        ref={dialogRef}
        title1={
          <Text
            tag={
              props.params?.HeadingTag ||
              getSubheadingTag(props.parentHeadingTag, 'h3')
            }
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssText field={props.fields?.ModalContent[0]?.fields?.Title} />
          </Text>
        }
        copy1={
          <JssRichText field={props.fields?.ModalContent[0]?.fields?.Text} />
        }
        title2={
          <Text
            tag={
              props.params?.HeadingTag ||
              getSubheadingTag(props.parentHeadingTag, 'h3')
            }
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssText field={props.fields?.ModalContent[1]?.fields?.Title} />
          </Text>
        }
        copy2={
          <JssRichText field={props.fields?.ModalContent[1]?.fields?.Text} />
        }
        cta1={
          !isExperienceEditor
            ? props?.fields?.ModalContent[0]?.fields?.CTALink?.value?.href && (
                <a
                  href={
                    props?.fields?.ModalContent[0]?.fields?.CTALink.value.href
                  }
                >
                  {props?.fields?.ModalContent[0]?.fields?.CTAIcon?.fields
                    ?.SvgMarkup?.value && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          props?.fields?.ModalContent[0]?.fields?.CTAIcon
                            ?.fields?.SvgMarkup.value,
                      }}
                    ></span>
                  )}
                  {props?.fields?.ModalContent[0]?.fields?.CTALink.value
                    ?.text && (
                    <>
                      <JssRichText
                        field={{
                          value:
                            props?.fields?.ModalContent[0]?.fields?.CTALink
                              .value?.text || '',
                        }}
                      />
                    </>
                  )}
                </a>
              )
            : props?.fields?.ModalContent[0]?.fields?.CTALink?.value && (
                <JssLink
                  field={props?.fields?.ModalContent[0]?.fields?.CTALink?.value}
                ></JssLink>
              )
        }
        cta2={
          !isExperienceEditor
            ? props?.fields?.ModalContent[1]?.fields?.CTALink?.value?.href && (
                <a
                  href={
                    props?.fields?.ModalContent[1]?.fields?.CTALink.value.href
                  }
                >
                  {props?.fields?.ModalContent[1]?.fields?.CTAIcon?.fields
                    ?.SvgMarkup?.value && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          props?.fields?.ModalContent[1]?.fields?.CTAIcon
                            ?.fields?.SvgMarkup.value,
                      }}
                    ></span>
                  )}
                  {props?.fields?.ModalContent[1]?.fields?.CTALink.value
                    ?.text && (
                    <>
                      <JssRichText
                        field={{
                          value:
                            props?.fields?.ModalContent[1]?.fields?.CTALink
                              .value?.text || '',
                        }}
                      />
                    </>
                  )}
                </a>
              )
            : props?.fields?.ModalContent[1]?.fields?.CTALink?.value && (
                <JssLink
                  field={props?.fields?.ModalContent[1]?.fields?.CTALink?.value}
                ></JssLink>
              )
        }
      />
    </>
  );
};
