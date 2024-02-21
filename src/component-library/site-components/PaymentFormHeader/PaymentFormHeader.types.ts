import { ReactNode } from 'react';

interface PhoneNumber {
  icon: JSX.Element | ReactNode;
  text: string;
  number: string;
}

interface OpeningHours {
  icon: JSX.Element | ReactNode;
  text: string;
}

export interface PaymentFormHeaderProps {
  paymentsText?: string;
  contactText?: string;
  phoneNumber?: PhoneNumber;
  openingHours?: OpeningHours;
  close?: JSX.Element | ReactNode;
}
