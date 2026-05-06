import { ReactNode, type JSX } from 'react';

export interface PaymentSummaryProps {
  heading?: ReactNode | JSX.Element;
  bodyText?: ReactNode | JSX.Element;
  summary?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
  isFlex?: boolean;
}
