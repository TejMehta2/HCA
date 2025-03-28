/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface SlotsCalendarBirthCompanyProps {
  children?: ReactNode | JSX.Element;
  titleText: string;
  keyShortNoticeText: string;
  keyBookOnlineText: string;
  API_C2_GetConsultantSlots_LoadingMsg: string;
  API_C2_GetConsultantSlots_BaseURL: string;
  API_C2_GetConsultantSlots_NoResultsMsg: string;
  viewMapText: string;
  chooseTimeHeading: string;
  shortNoticeIcon: any;
}

interface slot {
  id: string;
  label: string;
}

export interface slots {
  slots: slot[];
}

export interface day {
  date: string;
  dateLabel: string;
  slots: slots;
  weekDayLabel: string;
}

export type daysList = day[];
