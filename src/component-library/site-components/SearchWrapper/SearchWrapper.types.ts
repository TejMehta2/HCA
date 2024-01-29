import { ReactNode } from 'react';

export interface SearchWrapperProps {
  header?: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  search?: ReactNode | JSX.Element;
  searchDetail?: ReactNode | JSX.Element;
  showing: ReactNode | JSX.Element;
}
