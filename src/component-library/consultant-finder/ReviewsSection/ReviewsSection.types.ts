import { ReactNode } from 'react';

export interface ReviewsSectionProps {
  children?: ReactNode | JSX.Element;
  DoctifyReviewsImage: string;
  NoReviewsText: string;
  PatientReviewsText: string;
  PeerReivewsText: string;
  ReasonText: string;
  ReviewsFromPatientsTitleText: string;
  ReviewsFromPeersTitleText: string;
  VerifyByDoctifyText: string;
}
