import { ReactNode } from 'react';

export interface AppointmentSummaryProps {
  title?: ReactNode | JSX.Element;
  locationTitle?: ReactNode | JSX.Element;
  location?: ReactNode | JSX.Element;
  scanTitle?: ReactNode | JSX.Element;
  scan?: ReactNode | JSX.Element;
  appointmentTitle?: ReactNode | JSX.Element;
  appointment?: ReactNode | JSX.Element;
  dateTitle?: ReactNode | JSX.Element;
  date?: ReactNode | JSX.Element;
  priceTitle?: ReactNode | JSX.Element;
  price?: ReactNode | JSX.Element;
  isMobile?: boolean;
}
