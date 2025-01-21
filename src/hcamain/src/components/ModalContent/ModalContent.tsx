import React, { useRef } from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  Link as JssLink,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import ModalAppointment from '@component-library/components/ModalAppointment/ModalAppointment';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

interface Fields {
  Title?: Field<string>;
  Text?: Field<string>;
  PrimaryCTAIcon?: HCAIconFields;
  PrimaryCTA?: LinkField;
  SecondaryCTAIcon?: HCAIconFields;
  SecondaryCTA?: LinkField;
}

type ModalContentProps = {
  params?: Params;
  fields?: Fields;
};

const ModalContentDefaultComponent = (
  props: ModalContentProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ModalContent no datasource</span>
    </div>
  </div>
);

export const Default = (props: ModalContentProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!props.fields) {
    return <ModalContentDefaultComponent {...props} />;
  }

  return (
    <>
      <Button size="large" variation="full">
        <button onClick={() => dialogRef?.current?.showModal()}>
          {props.fields?.PrimaryCTA?.value?.text && (
            <>
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    props.fields?.PrimaryCTAIcon?.fields?.SvgMarkup?.value ||
                    '',
                }}
              ></span>
              <RichText
                tag="span"
                field={{
                  value: props?.fields?.PrimaryCTA.value.text,
                }}
              />
            </>
          )}
        </button>
      </Button>

      <ModalAppointment
        ref={dialogRef}
        title1={
          <Text
            variation={props.params?.HeadingSize || 'display-3'}
            tag={props.params?.HeadingTag || 'h2'}
          >
            <JssText field={props.fields?.Title} />
          </Text>
        }
        copy1={
          <Text variation={'body-large'}>
            <RichText tag="span" field={props.fields?.Text} />
          </Text>
        }
        cta1={
          <>
            {props.fields?.PrimaryCTA?.value?.text && (
              <Button
                size={'large'}
                contentVariation={'full-width'}
                variation={'full'}
              >
                <JssLink field={props.fields?.PrimaryCTA}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props.fields?.PrimaryCTAIcon?.fields?.SvgMarkup
                          ?.value || '',
                    }}
                  ></span>
                  <RichText
                    tag="span"
                    field={{
                      value: props.fields?.PrimaryCTA.value.text,
                    }}
                  />
                </JssLink>
              </Button>
            )}
            {props.fields?.SecondaryCTA?.value?.text && (
              <TextButton>
                <JssLink field={props.fields?.SecondaryCTA}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props.fields?.SecondaryCTAIcon?.fields?.SvgMarkup
                          ?.value || '',
                    }}
                  ></span>
                  <RichText
                    tag="span"
                    field={{
                      value: props.fields?.SecondaryCTA?.value?.text,
                    }}
                  />
                </JssLink>
              </TextButton>
            )}
          </>
        }
      />
    </>
  );
};
