import { type JSX } from 'react';
import { AppPlaceholder, debug } from '@sitecore-content-sdk/nextjs';
import {
  Default as TbcBookingConfirmationClient,
  type TbcBookingConfirmationClientProps,
} from './TbcBookingConfirmationClient';
import {
  TbcBookingConfirmationProps,
  TransactionStatusResponse,
} from './TbcBookingConfirmation.types';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;

type BookingConfirmationContext = {
  bookingConfirmation?: {
    orderId?: string;
    transactionId?: string;
  };
};

const getBookingConfirmationContext = (
  props: TbcBookingConfirmationProps
) => {
  return (
    props.page.layout.sitecore.context as typeof props.page.layout.sitecore.context &
      BookingConfirmationContext
  ).bookingConfirmation;
};

const fetchTransactionStatus = async (
  props: TbcBookingConfirmationProps
): Promise<TransactionStatusResponse | undefined> => {
  const bookingConfirmation = getBookingConfirmationContext(props);
  let response: Response | undefined;

  const orderIdQuery = `orderId=${bookingConfirmation?.orderId}`;
  const transactionId = `transactionId=${bookingConfirmation?.transactionId}`;
  const site = `site=${props.page.layout.sitecore.context.site?.name}`;
  const itemPath = `itemPath=${props.page.layout.sitecore.context.itemPath}`;

  debug.common(
    'TBCBookingConfirmation query.path',
    bookingConfirmation?.orderId
  );
  debug.common('TBCBookingConfirmation fetchTransactionStatus started');

  if (props.page.mode.isEditing) {
    debug.common('TBCBookingConfirmation in edit mode');

    return {
      serviceName: 'Wellbeing scan',
      extras: 'Multiple Pregnancy,Servical Scan',
      appointmentDateTime: '2025-04-08T10:00:00',
      type: 'Sonographer',
      location: 'Hale',
      duration: '50',
      status: 'Successful',
      retryQuerystring: null,
    };
  }

  try {
    const url = `${SERVER_API_URL}/tbcbooking/transactionstatus/hca/payment/1/en?${transactionId}&${orderIdQuery}&${site}&${itemPath}`;
    debug.common('TBCBookingConfirmation API fetch url', url);
    response = await fetch(url, { cache: 'no-store' });
    const transactionStatus = await response.json();
    return transactionStatus?.response;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.log(await response?.text?.());
    return;
  }
};

export const Default = async (
  props: TbcBookingConfirmationProps
): Promise<JSX.Element> => {
  const { componentMap, ...clientProps } = props;
  const transactionStatus = await fetchTransactionStatus(props);
  const phKey = `booking-step-aside-${props.params?.DynamicPlaceholderId}`;
  const asidePlaceholder =
    props.rendering && componentMap ? (
      <PlaceHolderWrapper>
        <AppPlaceholder
          name={phKey}
          rendering={props.rendering}
          page={props.page}
          componentMap={componentMap}
        />
      </PlaceHolderWrapper>
    ) : undefined;

  return (
    <TbcBookingConfirmationClient
      {...(clientProps as TbcBookingConfirmationClientProps)}
      asidePlaceholder={asidePlaceholder}
      transactionStatus={transactionStatus}
    />
  );
};
