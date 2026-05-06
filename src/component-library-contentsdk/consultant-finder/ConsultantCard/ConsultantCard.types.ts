/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface ConsultantCardProps {
  children?: ReactNode | JSX.Element;
  name: string;
  slug: string;
  gmcNumber: string;
  profilePhoto?: string;
  keywords: any;
  hospitals: string[];
  reviewsCount: number;
  reviewsTotal: number;
  hideAppointmentRequest: boolean;
  consultantsSlugs: string[];
  doctifyLogo: ReactNode | JSX.Element;
  doctifyText: string;
  isLiveDiaryConsultant: boolean;
  firstAppointment: any;
  nextAppointmentTitle: string;
  lastUpdatedText: string;
  loadingNextAppointmentText: string;
  enquireNowCTAText: string;
  bookNowCTAText: string;
  viewProfileCTAText: string;
  showMoreText: string;
  showLessText: string;
  iconShowMore?: ReactNode | JSX.Element;
  iconShowLess?: ReactNode | JSX.Element;
  practicesTitle: string;
  treatmentsTitle: string;
  phoneNumberHref: string;
  callToBookButtonText: string;
  callToBookButtonIcon: string;
  viewProfileLink: any;
  bookOnlineLink: any;
  enquireNowLink: any;
  callToBookModalTitle: string;
  phoneNumberDisplay: string;
  doctifyPhoneSlugs: string[];
  URLprams?: string;
  ignoreReviewsConsultantsList?: any;
}
