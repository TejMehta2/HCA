import { ReactNode } from 'react';

export interface ConsultantCardProps {
  children?: ReactNode | JSX.Element;
  name: string;
  slug: string;
  specialty: string;
  profilePhoto?: string;
  treatmentsList: string[];
  conditionsList: string[];
  hospitals: string[];
  reviewsCount: number;
}
