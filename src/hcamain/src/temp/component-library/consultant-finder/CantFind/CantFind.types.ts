import { ReactNode } from 'react';

export interface CantFindProps {
  children?: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element | string;
  contentVariation?: 'the-birth-company';
}
