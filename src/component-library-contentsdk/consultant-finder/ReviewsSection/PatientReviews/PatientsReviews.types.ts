import { ReactNode } from 'react';

export interface PatientsReviewsProps {
  children?: ReactNode | JSX.Element;
  slug: string;
  doctifyLogo: string;
  doctifyReviewsURL: string;
  doctifyReviewsLimit: number;
  reviewsFromPatientsTitleText: string;
  verifyByDoctifyText: string;
  noReviewsText: string;
}
