import { ReactNode } from 'react';

interface item {
  title: string;
  text: string;
}
export interface ConfirmationSummaryProps {
  children?: ReactNode | JSX.Element;
  title?: string;
  patientTitle?: string;
  patientName?: string;
  dateTitle?: string;
  date?: string;
  timeTitle?: string;
  time?: string;
  consultantTitle?: string;
  consultantName?: string;
  facilityTitle?: string;
  facilityName?: string;
  optionalItems?: item[];
}
