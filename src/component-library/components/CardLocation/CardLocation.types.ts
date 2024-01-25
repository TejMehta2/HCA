import { ReactNode } from 'react';

export interface CardLocationProps {
  amount: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element;
  cta: ReactNode | JSX.Element;
  theme:
    | 'B-HCA-Green'
    | 'E-HCA-Dark-Grey'
    | 'D-HCA-Light-Orange'
    | 'L-HCA-Coral-60';
}
