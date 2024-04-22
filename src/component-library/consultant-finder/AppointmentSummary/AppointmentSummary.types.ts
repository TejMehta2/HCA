import { ReactNode } from 'react';

export interface AppointmentSummaryProps {
  children?: ReactNode | JSX.Element;
  title: string;
  consultantTitle: string;
  consultantText: string;
  locationTitle: string;
  locationText: string;
  dateTitle: string;
  dateText: string;
  slug: string;
  gmcNumber: string | number | null;
  isFollowUpAppointment: string;
}
