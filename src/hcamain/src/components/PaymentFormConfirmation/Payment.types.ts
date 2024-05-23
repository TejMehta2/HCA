import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

export interface Fields {
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

export type PaymentFormConfirmationProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

export interface TransactionStatusResponse {
  amount: string;
  referenceNumber: string;
  paymentDate: string;
  lastUpdateDate: string;
  paymentType: string;
  status: string;
  transactionId: string;
}
