import { ReactNode } from 'react';

export interface DoctifyProps {
  reviews: string;
  rating: number;
  logo: {
    light: ReactNode | JSX.Element;
    dark: ReactNode | JSX.Element;
  };
  theme?: 'dark' | 'light';
}
