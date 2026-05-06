import { ReactNode, type JSX } from 'react';

export interface CareersSearchResultsProps {
  header?: ReactNode | JSX.Element;
  count?: ReactNode | JSX.Element;
  results?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}
