/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, type JSX } from 'react';

export interface ReviewsProps {
  reviewsTotal: number;
  reviewsCount: number;
  reviewsText?: string;
  noReviewsMsg?: string;
  isConsultantProfileReviews: boolean;
  hasTooltip?: boolean;
  tooltipContent?: ReactNode | JSX.Element;
  titleText?: string;
  doctifyText?: string;
  doctifyLogo?: ReactNode | JSX.Element;
  hasDoctifyBranding?: boolean;
  reviewsRef?: any;
  ignoreReviewsConsultant?: boolean;
}
