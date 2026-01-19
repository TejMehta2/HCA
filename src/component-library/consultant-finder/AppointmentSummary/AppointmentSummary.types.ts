/* eslint-disable @typescript-eslint/no-explicit-any */
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
  name?: string;
  gmcNumber: string | number | null;
  reviewsTotal: number | null;
  isFollowUpAppointment: string;
  isMobile?: boolean;
  liveBookingFormStepSlotSelect: any;
  liveBookingFormStepLocationSelect: any;
  search?: string;
  keywordId?: string;
}
