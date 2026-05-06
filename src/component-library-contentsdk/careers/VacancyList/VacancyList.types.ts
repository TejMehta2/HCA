import { ReactNode, type JSX } from 'react';

export interface VacancyListProps {
  title?: ReactNode | JSX.Element;
  filters?: ReactNode | JSX.Element;
  cards?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}
