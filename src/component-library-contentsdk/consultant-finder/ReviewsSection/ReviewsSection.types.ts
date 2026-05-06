import { ReactNode, type JSX } from 'react';

export interface ReviewsSectionProps {
  children?: ReactNode | JSX.Element;
  DoctifyReviewsImage: string;
  DoctifyPatientReviewsURL: string;
  DoctifyPatientReviewsLimit: number;
  DoctifyPeerReviewsURL: string;
  DoctifyPeerReviewsLimit: number;
  NoReviewsText: string;
  PatientReviewsText: string;
  PeerReivewsText: string;
  ReasonText: string;
  ReviewsFromPatientsTitleText: string;
  ReviewsFromPeersTitleText: string;
  VerifyByDoctifyText: string;
}
