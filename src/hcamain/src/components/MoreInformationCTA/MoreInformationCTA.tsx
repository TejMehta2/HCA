import React, { useRef } from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext,
  RichText as JssRichText,
  LinkFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Button from '@component-library/core-components/Button/Button';
import ModalText from '@component-library/components/ModalText/ModalText';
import Text from '@component-library/foundation/Text/Text';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type ModalContentFields = {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
  };
};

interface Fields {
  CTAIcon?: HCAIconFields;
  CTALink?: { value: LinkFieldValue };
  ModalContent?: ModalContentFields[];
}

type MoreInformationCTAProps = {
  params?: Params;
  fields?: Fields;
};

const MoreInformationCTADefaultComponent = (
  props: MoreInformationCTAProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
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

  if (!props.fields) {
    return <MoreInformationCTADefaultComponent {...props} />;
  }

  if (!props.fields?.ModalContent) return <></>;

  console.log(props);

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
          <Text tag="h4" variation="display-4">
            <JssText field={props.fields?.ModalContent[0].fields?.Title} />
          </Text>
        }
        copy1={
          <JssRichText field={props.fields?.ModalContent[0].fields?.Text} />
        }
        title2={
          <Text tag="h4" variation="display-4">
            <JssText field={props.fields?.ModalContent[1].fields?.Title} />
          </Text>
        }
        copy2={
          <JssRichText field={props.fields?.ModalContent[1].fields?.Text} />
        }
      />
    </>
  );
};
