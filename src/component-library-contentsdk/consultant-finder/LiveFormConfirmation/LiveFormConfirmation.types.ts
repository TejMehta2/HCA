import { ReactNode } from 'react';

export interface LiveFormConfirmationProps {
  children?: ReactNode | JSX.Element;
  headline?: ReactNode | JSX.Element;
  summary?: ReactNode | JSX.Element;
  nextStepsTitle?: ReactNode | JSX.Element | string;
  nextStepsContent?: ReactNode | JSX.Element | string;
  amendBookingTitle?: ReactNode | JSX.Element | string;
  amendBookingContent?: ReactNode | JSX.Element | string;
  isEnquireForm?: boolean;
}
