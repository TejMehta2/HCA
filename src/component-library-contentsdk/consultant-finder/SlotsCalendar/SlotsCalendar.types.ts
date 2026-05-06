/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, type JSX } from 'react';

export interface SlotsCalendarProps {
  children?: ReactNode | JSX.Element;
  holidays: any;
  titleText: string;
  keyShortNoticeText: string;
  keyBookOnlineText: string;
  API_C2_GetConsultantSlots_LoadingMsg: string;
  API_C2_GetConsultantSlots_BaseURL: string;
  API_C2_GetConsultantSlots_NoResultsMsg: string;
  viewMapText: string;
  chooseTimeHeading: string;
  shortNoticeIcon: any;
  slug?: any;
  gmcNumber?: any;
  reviewsTotal?: any;
  name?: string;
  backLinkHref?: any;
  backLinkText?: string;
  modalRef: any;
  resultsLink?: string;
  search?: string;
  keywordId?: string;
}
