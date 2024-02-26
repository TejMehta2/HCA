import { ReactNode } from 'react';

export interface CardLocationProps {
  amount: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element;
  cta: ReactNode | JSX.Element;
  theme: 'F-HCA-Fern' | 'B-HCA-Navy-Blue' | 'H-HCA-Tangerine' | 'G-HCA-Orange';
}
