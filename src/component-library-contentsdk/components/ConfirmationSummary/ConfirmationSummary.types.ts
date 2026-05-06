import { ReactNode, type JSX } from 'react';

interface item {
  title: string | JSX.Element;
  text: string | JSX.Element;
}
export interface ConfirmationSummaryProps {
  children?: ReactNode | JSX.Element;
  title?: string | JSX.Element;
  patientTitle?: string | JSX.Element;
  patientName?: string | JSX.Element;
  dateTitle?: string | JSX.Element;
  date?: string | JSX.Element;
  timeTitle?: string | JSX.Element;
  time?: string | JSX.Element;
  consultantTitle?: string | JSX.Element;
  consultantName?: string | JSX.Element;
  facilityTitle?: string | JSX.Element;
  facilityName?: string | JSX.Element;
  optionalItems?: item[];
  noSpacing?: boolean;
}
