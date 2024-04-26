import { ReactNode } from 'react';

export interface ConfirmationSummaryProps {
  children?: ReactNode | JSX.Element;
  title: string;
  patientTitle: string;
  patientName: string;
  dateTitle: string;
  date: string;
  timeTitle: string;
  time: string;
  consultantTitle: string;
  consultantName: string;
  facilityTitle: string;
  facilityName: string;
}
