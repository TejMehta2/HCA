import { ReactNode } from 'react';

export interface CardLocationProps {
  amount: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element;
  cta: ReactNode | JSX.Element;
  theme:
    | 'F-HCA-Fern'
    | 'B-HCA-Navy-Blue'
    | 'D-HCA-Light-Orange'
    | 'G-HCA-Orange';
}
