/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface ConsultantCardProps {
  children?: ReactNode | JSX.Element;
  name: string;
  slug: string;
  profilePhoto?: string;
  keywords: any;
  hospitals: string[];
  reviewsCount: number;
  hideAppointmentRequest: boolean;
  consultantsSlugs: string[];
  doctifyLogo: ReactNode | JSX.Element;
  isLiveDiaryConsultant: boolean;
  firstAppointment: any;
  loadingNextAppointmentText: string;
}
