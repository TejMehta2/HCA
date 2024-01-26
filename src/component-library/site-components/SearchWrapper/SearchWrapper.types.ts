import { ReactNode } from 'react';

export interface SearchWrapperProps {
  subtitle?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  body?: ReactNode | JSX.Element;
  ctas?: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
}
