import { type JSX } from 'react';
import {
  AppPlaceholder,
  type GetComponentServerProps,
  debug,
} from '@sitecore-content-sdk/nextjs';
import {
  Default as TbcBookingConfirmationClient,
  type TbcBookingConfirmationClientProps,
} from './TbcBookingConfirmationClient';
import { TbcBookingConfirmationProps } from './TbcBookingConfirmation.types';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;

export const Default = (
  props: TbcBookingConfirmationProps
): JSX.Element => {
  const { componentMap, ...clientProps } = props;
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
    />
  );
};

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
    debug.common('TBCBookingConfirmation in edit mode');

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
