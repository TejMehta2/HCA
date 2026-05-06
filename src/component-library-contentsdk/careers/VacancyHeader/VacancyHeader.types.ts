import { type JSX } from 'react';
export interface VacancyHeaderProps {
  location?: string;
  city?: string;
  clinical?: string;
  timing?: string;
  vacancyCode?: string;
  title?: JSX.Element;
  cta?: JSX.Element;
  image?: JSX.Element;
}
