import {
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import type { ComponentMap } from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';

export type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

export interface Fields {
  Title?: Field<string>;
  Text?: Field<string>;
  Info?: Field<string>;
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
  StartLink: LinkField;
  ServiceNameLabel?: Field<string>;
  ExtrasLabel?: Field<string>;
  DateLabel?: Field<string>;
  TimeLabel?: Field<string>;
  DurationLabel?: Field<string>;
  TypeLabel?: Field<string>;
  LocationLabel?: Field<string>;
  AmountLabel?: Field<string>;
}

export type TbcBookingConfirmationProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  componentMap?: ComponentMap;
  serviceName: string;
  extras: string;
  type: string;
  duration: string;
  appointmentDateTime: string;
  location: string;
  amount: string;
  retryQuerystring: string;
};

export interface TransactionStatusResponse {
  amount: string;
  referenceNumber: string;
  paymentDate: string;
  lastUpdateDate: string;
  paymentType: string;
  status: string;
  paymentTransactionId: string;
  orderId: string;
}
