import { ReactNode } from 'react';

export interface PeerReviewsProps {
  children?: ReactNode | JSX.Element;
  slug: string;
  doctifyLogo: string;
  doctifyReviewsURL: string;
  doctifyReviewsLimit: number;
  reviewsFromPeersTitleText: string;
  verifyByDoctifyText: string;
  noReviewsText: string;
}
