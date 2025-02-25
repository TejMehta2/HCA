import { ReactNode } from 'react';

export interface YextResultCardCareersProps {
  office?: string;
  location?: string;
  clinical?: string;
  timing?: string;
  title?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
  variation?: 'carousel';
}
