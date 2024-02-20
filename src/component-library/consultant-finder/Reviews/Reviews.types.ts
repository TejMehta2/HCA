import { ReactNode } from 'react';

export interface ReviewsProps {
  reviewsTotal: number;
  reviewsCount: number;
  reviewsText?: string;
  isConsultantProfileReviews: boolean;
  hasTooltip?: boolean;
  tooltipContent?: ReactNode | JSX.Element;
  titleText?: string;
  doctifyText?: string;
  doctifyLogo?: ReactNode | JSX.Element;
  hasDocitfyBranding?: boolean;
}
