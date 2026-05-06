import { ReactNode } from 'react';

export interface DoctifyProps {
  reviews: ReactNode | JSX.Element;
  rating: string | number | JSX.Element;
  logo: {
    dark: ReactNode | JSX.Element;
    light: ReactNode | JSX.Element;
  };
  link: ReactNode | JSX.Element;

  alignment?: 'left' | 'centre' | 'right';
}
