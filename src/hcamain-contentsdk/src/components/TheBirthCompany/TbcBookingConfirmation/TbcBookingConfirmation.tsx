'use client';

import { type JSX, Suspense } from 'react';
import {
  AppPlaceholder,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  useComponentProps,
  GetComponentServerProps,
  debug,
} from '@sitecore-content-sdk/nextjs';
import { useSearchParams } from 'next/navigation';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import PaymentSummary from '@component-library/site-components/PaymentSummary/PaymentSummary';
import ConfirmationSummary from '@component-library/components/ConfirmationSummary/ConfirmationSummary';
import HeaderText from '@component-library/site-components/HeaderText/HeaderText';
import RichText from '@component-library/core-components/RichText/RichText';
import {
  TbcBookingConfirmationProps,
  TransactionStatusResponse,
} from './TbcBookingConfirmation.types';
import FormContainer from 'src/jss-abstractions/FormContainer/FormContainer';
import CFAside from '@component-library/consultant-finder/CFAside/CFAside';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import Script from 'next/script';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;

function getEcommerceDataLayer(
  props: TbcBookingConfirmationProps,
  transactionId: string | null,
  orderId: string | null
): string {
  try {
    if (!props || !props.amount || !props.serviceName || !props.location) {
      return '';
    }

    const rawValue = props.amount.replace(/[^\d.]/g, ''); // Strip non-digit and non-decimal characters, most likely £)
    const value = parseFloat(rawValue).toFixed(2);
    const currency = 'GBP';
    const itemName =
      props.serviceName + (props.extras ? `,${props.extras}` : '');
    const itemBrand = props.location;

    const dataLayer = transactionId
      ? [
          'window.dataLayer = window.dataLayer || [];',
          'window.dataLayer.push({ ecommerce: null });',
          `window.dataLayer.push(${JSON.stringify({
            event: 'purchase',
            ecommerce: {
              transaction_id: transactionId,
              value,
              currency,
              items: [
                {
                  item_name: itemName,
                  item_brand: itemBrand,
                  item_id: transactionId,
                  price: value,
                  quantity: '1',
                },
              ],
            },
          })});`,
        ]
      : [
          'window.dataLayer = window.dataLayer || [];',
          `window.dataLayer.push(${JSON.stringify({
            event: 'birthCompanyBooking',
            goalType: 'appointmentBooking',
            scanType: itemName,
            apptWith: props.type,
            location: itemBrand,
            apptCost: value,
            bookingID: orderId,
          })});`,
        ];
    return dataLayer.join('\n');
  } catch (error) {
    console.error('Failed to generate ecommerce data layer:', error);
    return '';
  }
}

const TbcBookingConfirmationDefaultComponent = (
  props: TbcBookingConfirmationProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Tbc Booking Confirmation please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const DefaultContent = (props: TbcBookingConfirmationProps): JSX.Element => {
  debug.common('TBCBookingConfirmation Default Component started');
  const transactionStatus = useComponentProps<TransactionStatusResponse>(
    props.rendering?.uid
  );

  debug.common('TbcBookingConfirmation transactionStatus', transactionStatus);

  const phKey = `booking-step-aside-${props.params?.DynamicPlaceholderId}`;

  const searchParams = useSearchParams();
  const paramErrors = searchParams.get('error');

  const isExperienceEditor = props.page.mode.isEditing;

  //use status querystring param to manually switch between successful and failed views in edit mode
  if (isExperienceEditor && transactionStatus != null) {
    const status = searchParams.get('status');
    transactionStatus.status = status !== 'failed' ? 'Successful' : 'failed';
  }

  if (!props.fields) {
    return <TbcBookingConfirmationDefaultComponent {...props} />;
  }

  const ecommerceDataLayer = getEcommerceDataLayer(
    props,
    transactionStatus?.paymentTransactionId || '',
    transactionStatus?.orderId || ''
  );

  if (transactionStatus?.status !== 'Successful' || paramErrors) {
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
                href={`${props.fields.ErrorCTALink?.value.href}${
                  props.retryQuerystring || ''
                }`}
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

  const date = new Date(props.appointmentDateTime);

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDateTime = new Intl.DateTimeFormat(
    'en-GB',
    dateTimeOptions
  ).format(date);

  const [formattedDate, formattedTime] = formattedDateTime.split(', ');

  const options = [
    {
      title: props.fields?.ServiceNameLabel?.value || 'Scan',
      text: props.serviceName,
    },
    {
      title: props.fields?.DateLabel?.value || 'Date',
      text: formattedDate,
    },
    {
      title: props.fields?.TimeLabel?.value || 'Time',
      text: formattedTime.toLowerCase().replace(/\s/g, ''),
    },
    {
      title: props.fields?.DurationLabel?.value || 'Duration',
      text: `${props.duration} minutes`,
    },
    {
      title: props.fields?.TypeLabel?.value || 'Type',
      text: props.type,
    },
    {
      title: props.fields?.LocationLabel?.value || 'Location',
      text: props.location,
    },
  ];

  if (props.extras) {
    options.splice(1, 0, {
      title: 'Extras',
      text: props.extras,
    });
  }

  if (props.amount) {
    options.push({
      title: props.fields?.AmountLabel?.value || 'Price paid',
      text: props.amount,
    });
  }

  return (
    <>
      {ecommerceDataLayer && (
        <Script
          id="tbc-booking-confirmation-data-layer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: ecommerceDataLayer,
          }}
        />
      )}
      <FormContainer
        heading={<></>}
        copy={
          <PaymentSummary
            isFlex={true}
            heading={
              <Text
                variation={props.params?.HeadingSize || 'display-4'}
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
                optionalItems={options}
                noSpacing={true}
              />
            }
          />
        }
        aside={
          <CFAside>
            {props.rendering && props.componentMap && (
              <PlaceHolderWrapper>
                <AppPlaceholder
                  name={phKey}
                  rendering={props.rendering}
                  page={props.page}
                  componentMap={props.componentMap}
                />
              </PlaceHolderWrapper>
            )}
          </CFAside>
        }
      >
        <>
          <RichText>
            <JssRichText field={props.fields?.Info} />
          </RichText>
          <Button variation="full-dark" size="large">
            <JssLink field={props.fields.StartLink}></JssLink>
          </Button>
        </>
      </FormContainer>
    </>
  );
};

export const Default = (props: TbcBookingConfirmationProps): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);

export const getComponentServerProps: GetComponentServerProps = async (
  _,
  layoutData,
  context
) => {
  const { query = {} } = context as {
    query?: Record<string, string | string[]>;
  };
  let response;

  const orderIdQuery = `orderId=${query.path}`;
  const transactionId = `transactionId=${query['transaction_id']}`;
  const site = `site=${layoutData.sitecore.context.site?.name}`;
  const itemPath = `itemPath=${layoutData.sitecore.context.itemPath}`;

  debug.common('TBCBookingConfirmation query.path', query.path);
  debug.common('TBCBookingConfirmation getComponentServerProps started');

  if (layoutData.sitecore.context.pageEditing) {
    const mockResponse = {
      serviceName: 'Wellbeing scan',
      extras: 'Multiple Pregnancy,Servical Scan',
      appointmentDateTime: '2025-04-08T10:00:00',
      type: 'Sonographer',
      location: 'Hale',
      duration: '50',
      status: 'Successful',
      retryQuerystring: null,
    };

    return mockResponse;
  }

  try {
    const url = `${SERVER_API_URL}/tbcbooking/transactionstatus/hca/payment/1/en?${transactionId}&${orderIdQuery}&${site}&${itemPath}`;
    debug.common('TBCBookingConfirmation API fetch url', url);
    response = await fetch(url);
    const transactionStatus = await response.json();
    return transactionStatus?.response;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.log(await response?.text?.());
    return;
  }
};
