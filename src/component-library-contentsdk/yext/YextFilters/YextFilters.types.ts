import { ReactNode, type JSX } from 'react';

export interface YextFiltersProps {
  children?: ReactNode | JSX.Element;
  label?: string;
  mobileLabel?: string;
  buttonIcon?: ReactNode | JSX.Element;
  filtersTitle?: string;
  resultsCount?: number;
}
