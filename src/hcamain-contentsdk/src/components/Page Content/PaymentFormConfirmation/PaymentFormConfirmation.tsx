'use client';

import { type JSX } from 'react';
import {
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  useComponentProps,
  GetComponentServerProps,
} from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import PaymentSummary from '@component-library/site-components/PaymentSummary/PaymentSummary';
import ConfirmationSummary from '@component-library/components/ConfirmationSummary/ConfirmationSummary';
import Icons from '@component-library/foundation/Icons/Icons';
import HeaderText from '@component-library/site-components/HeaderText/HeaderText';
import RichText from '@component-library/core-components/RichText/RichText';
import {
  PaymentFormConfirmationProps,
  TransactionStatusResponse,
} from './Payment.types';
import Header from '../PaymentForm/helpers/Header';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;

const PaymentFormConfirmationDefaultComponent = (
  props: PaymentFormConfirmationProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
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
  const transactionStatus = useComponentProps<TransactionStatusResponse>(
    props.rendering?.uid
  );

  const isExperienceEditor = props.page.mode.isEditing;
  if (!props.fields) {
    return <PaymentFormConfirmationDefaultComponent {...props} />;
  }

  if (transactionStatus?.status !== 'Successful') {
    return (
      <HeaderText
        fullHeight={false}
        title={
          <Text
            variation={props.params?.HeadingSize || 'display-3'}
            tag={props.params?.HeadingTag || 'h2'}
          >
            <JssText field={props.fields?.ErrorTitle} />
          </Text>
        }
        error={<JssText field={props.fields?.ErrorMessage} />}
        description={
          <RichText>
            <JssRichText field={props.fields?.ErrorText} />
          </RichText>
        }
        cta={
          isExperienceEditor ? (
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
                        props.fields?.ErrorCTAIcon?.fields?.SvgMarkup?.value ||
                        '',
                    }}
                  />
                )}
                {props?.fields?.ErrorCTALink?.value?.text && (
                  <JssRichText
                    field={{
                      value: props.fields?.ErrorCTALink?.value?.text,
                    }}
                  />
                )}
              </JssLink>
            </Button>
          ) : (
            <></>
          )
        }
      />
    );
  }

  const {
    amount,
    referenceNumber,
    paymentDate,
    paymentType,
    status,
    // lastUpdateDate,
    transactionId,
  } = transactionStatus;

  return (
    <>
      <Header stage={'Confirmation'} />
      <PaymentSummary
        heading={
          <Text
            variation={props.params?.HeadingSize || 'display-3'}
            tag={props.params?.HeadingTag || 'h2'}
          >
            <JssText field={props.fields?.Title} />
          </Text>
        }
        bodyText={
          <RichText>
            <JssRichText field={props.fields?.Text} />
          </RichText>
        }
        summary={
          <ConfirmationSummary
            title={<JssText field={props.fields?.SummaryTitle} />}
            optionalItems={[
              {
                title: <JssText field={props.fields?.AmountPaidText} />,
                text: amount,
              },
              {
                title: <JssText field={props.fields?.InvoiceReferenceText} />,
                text: referenceNumber,
              },
              {
                title: <JssText field={props.fields?.PaymentDateText} />,
                text: paymentDate,
              },
              {
                title: <JssText field={props.fields?.PaymentTypeText} />,
                text: paymentType,
              },
              {
                title: <JssText field={props.fields?.StatusText} />,
                text: status,
              },
              {
                title: <JssText field={props.fields?.TransactionIDText} />,
                text: transactionId,
              },
            ]}
          />
        }
        cta={
          <Button variation="full-dark" size="large">
            <button
              onClick={() => {
                window.print();
              }}
            >
              <Icons iconName="iconPrint" />
              Print confirmation
            </button>
          </Button>
        }
      />
    </>
  );
};

export const getComponentServerProps: GetComponentServerProps = async (
  _,
  layoutData,
  context
) => {
  const { query = {}, req } = context as {
    query?: Record<string, string | string[]>;
    req?: { headers: { host?: string }; url?: string };
  };

  const transactionIdValue = query['transaction_id'];

  // If no transaction_id, log full URL and skip request
  if (!transactionIdValue) {
    const fullUrl = `${req?.headers.host ?? ''}${req?.url ?? ''}`;
    console.log('verifone payment failed:', fullUrl);
    return {};
  }

  let response;
  const transactionId = `transactionId=${transactionIdValue}`;
  const site = `site=${layoutData.sitecore.context.site?.name}`;
  const itemPath = `itemPath=${layoutData.sitecore.context.itemPath}`;

  try {
    response = await fetch(
      `${SERVER_API_URL}/api/transactionstatus/hca/payment/1/en?${transactionId}&${site}&${itemPath}`
    );
    const transactionStatus = await response.json();
    return transactionStatus?.response;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.log(await response?.text?.());
    return {};
  }
};
