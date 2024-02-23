import { ReactNode } from 'react';

export interface ReviewsProps {
  reviewsTotal: number;
  reviewsCount: number;
  reviewsText?: string;
  noReviewsMsg: string;
  isConsultantProfileReviews: boolean;
  hasTooltip?: boolean;
  tooltipContent?: ReactNode | JSX.Element;
  titleText?: string;
  doctifyText?: string;
  doctifyLogo?: ReactNode | JSX.Element;
  hasDoctifyBranding?: boolean;
}
