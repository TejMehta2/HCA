import { ReactNode } from 'react';

export interface CardMapProps {
  amount: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element;
  cta: ReactNode | JSX.Element;
  theme: 'b' | 'e' | 'd' | 'l';
}
