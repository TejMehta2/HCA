import { ReactNode } from 'react';

interface PhoneNumber {
  icon: JSX.Element | ReactNode;
  text: string | JSX.Element;
  number: string | JSX.Element;
}

interface OpeningHours {
  icon: JSX.Element | ReactNode;
  text: string;
}

export interface PaymentFormHeaderProps {
  paymentsText?: string | JSX.Element;
  contactText?: string | JSX.Element;
  phoneNumber?: PhoneNumber;
  openingHours?: OpeningHours;
  logo?: JSX.Element;
}
