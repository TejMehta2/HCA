import { ReactNode } from 'react';

export interface PeerReviewsProps {
  children?: ReactNode | JSX.Element;
  slug: string;
  docitfyLogo: string;
  reviewsFromPeersTitleText: string;
  verifyByDoctifyText: string;
  noReviewsText: string;
}
