import { ReactNode, type JSX } from 'react';

export interface HeadlineProps {
  children?: ReactNode | JSX.Element;
  withConsultantName?: boolean;
  slotsStep?: boolean;
  name?: string;
  slug?: string;
  gmcNumber?: string;
  reviewsTotal?: number;
  backLink?: string;
  backLinkText?: string;
  headingText?: string;
  backLinkProfile?: string;
  backLinkSimple?: string;
  hasTitleName?: boolean;
  resultsLink?: string;
  search?: string;
  keywordId?: string;
}
