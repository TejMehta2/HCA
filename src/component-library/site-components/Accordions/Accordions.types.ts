import { ReactNode } from 'react';

export interface AccordionsProps {
  header?: ReactNode | JSX.Element;
  accordions: {
    title: ReactNode | JSX.Element;
    children: ReactNode | JSX.Element;
  }[];
  cta?: ReactNode | JSX.Element;
}
