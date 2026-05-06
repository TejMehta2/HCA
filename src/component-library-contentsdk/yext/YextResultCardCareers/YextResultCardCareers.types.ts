import { ReactNode, type JSX } from 'react';

export interface YextResultCardCareersProps {
  location?: string;
  city?: string;
  clinical?: string;
  timing?: string;
  title?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
  variation?: 'carousel';
}
