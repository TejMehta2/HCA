import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  Link as JssLink,
  RichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import Params from 'src/types/params';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

interface Fields {
  Title?: Field<string>;
  Text?: Field<string>;
  SummaryTitle?: Field<string>;
  AmountPaidText?: Field<string>;
  InvoiceReferenceText?: Field<string>;
  PaymentDateText?: Field<string>;
  PaymentTypeText?: Field<string>;
  StatusText?: Field<string>;
  TransactionIDText?: Field<string>;
  CTAIcon?: HCAIconFields;
  CTAText?: Field<string>;
  ErrorTitle?: Field<string>;
  ErrorMessage?: Field<string>;
  ErrorText?: Field<string>;
  ErrorCTAIcon?: HCAIconFields;
  ErrorCTALink: LinkField;
}

type PaymentFormConfirmationProps = {
  params?: Params;
  fields?: Fields;
};

const PaymentFormConfirmationDefaultComponent = (
  props: PaymentFormConfirmationProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Payment Form Confirmation please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: PaymentFormConfirmationProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <PaymentFormConfirmationDefaultComponent {...props} />;
  }

  return (
    <>
      <span>Success Message</span>
      <Text
        variation={props.params?.HeadingSize || 'display-4'}
        tag={props.params?.HeadingTag || 'h2'}
      >
        <JssText field={props.fields?.Title} />
      </Text>
      <Text variation={'body-large'}>
        <RichText tag="span" field={props.fields?.Text} />
      </Text>
      <Text>
        <JssText field={props.fields?.SummaryTitle} />
      </Text>
      <Text>
        <JssText field={props.fields?.AmountPaidText} />
      </Text>
      <Text>
        <JssText field={props.fields?.InvoiceReferenceText} />
      </Text>
      <Text>
        <JssText field={props.fields?.PaymentDateText} />
      </Text>
      <Text>
        <JssText field={props.fields?.PaymentTypeText} />
      </Text>
      <Text>
        <JssText field={props.fields?.StatusText} />
      </Text>
      <Text>
        <JssText field={props.fields?.TransactionIDText} />
      </Text>
      <span>Error Message</span>
      <Text
        variation={props.params?.HeadingSize || 'display-4'}
        tag={props.params?.HeadingTag || 'h2'}
      >
        <JssText field={props.fields?.ErrorTitle} />
      </Text>
      <Text>
        <JssText field={props.fields?.ErrorMessage} />
      </Text>
      <Text variation={'body-large'}>
        <RichText tag="span" field={props.fields?.ErrorText} />
      </Text>
      {isExperienceEditor ? (
        <JssLink field={props.fields?.ErrorCTALink}></JssLink>
      ) : props.fields.ErrorCTALink?.value.href &&
        props.fields?.ErrorCTALink ? (
        <Button size={'large'} variation={'full'}>
          <JssLink
            href={props.fields.ErrorCTALink?.value.href}
            field={props.fields?.ErrorCTALink}
          >
            {props?.fields?.ErrorCTAIcon && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    props.fields?.ErrorCTAIcon?.fields?.SvgMarkup?.value || '',
                }}
              />
            )}
            {props?.fields?.ErrorCTALink?.value?.text && (
              <RichText
                tag="span"
                field={{
                  value: props.fields?.ErrorCTALink?.value?.text,
                }}
              />
            )}
          </JssLink>
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};
