import { type JSX } from 'react';
import {
  debug,
  Link as JssLink,
  RichText as JssRichText,
  Text as JssText,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import ConfirmationSummary from '@component-library/components/ConfirmationSummary/ConfirmationSummary';
import HeaderText from '@component-library/site-components/HeaderText/HeaderText';
import PaymentSummary from '@component-library/site-components/PaymentSummary/PaymentSummary';
import Text from '@component-library/foundation/Text/Text';
import RichText from '@component-library/core-components/RichText/RichText';
import {
  PaymentFormConfirmationProps,
  TransactionStatusResponse,
} from './Payment.types';
import Header from '../PaymentForm/helpers/Header';
import PrintConfirmationCta from './PrintConfirmationCta';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;

type PaymentConfirmationContext = {
  paymentConfirmation?: {
    transactionId?: string;
  };
};

const getPaymentConfirmationContext = (
  props: PaymentFormConfirmationProps
) => {
  return (
    props.page.layout.sitecore.context as typeof props.page.layout.sitecore.context &
      PaymentConfirmationContext
  ).paymentConfirmation;
};

const fetchTransactionStatus = async (
  props: PaymentFormConfirmationProps
): Promise<TransactionStatusResponse | undefined> => {
  const paymentConfirmation = getPaymentConfirmationContext(props);
  const transactionIdValue = paymentConfirmation?.transactionId;
  let response: Response | undefined;

  if (!transactionIdValue) {
    debug.common('PaymentFormConfirmation missing transaction_id');
    return;
  }

  const transactionId = `transactionId=${transactionIdValue}`;
  const site = `site=${props.page.layout.sitecore.context.site?.name}`;
  const itemPath = `itemPath=${props.page.layout.sitecore.context.itemPath}`;

  try {
    const url = `${SERVER_API_URL}/api/transactionstatus/hca/payment/1/en?${transactionId}&${site}&${itemPath}`;
    debug.common('PaymentFormConfirmation API fetch url', url);
    response = await fetch(url, { cache: 'no-store' });
    const transactionStatus = await response.json();
    return transactionStatus?.response;
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.log(await response?.text?.());
    }
    return;
  }
};

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

export const Default = async (
  props: PaymentFormConfirmationProps
): Promise<JSX.Element> => {
  const transactionStatus = await fetchTransactionStatus(props);
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
        cta={<PrintConfirmationCta />}
      />
    </>
  );
};
