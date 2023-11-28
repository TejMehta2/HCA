import { ReactNode } from 'react';

export interface DoctifyProps {
  reviews: string;
  rating: number;
  logo: {
    dark: ReactNode | JSX.Element;
    light: ReactNode | JSX.Element;
  };
  link: ReactNode | JSX.Element;
  theme?: 'dark' | 'light';
  alignment?: 'left' | 'centre' | 'right';
}
