import { ReactNode } from 'react';

export interface TooltipsProps {
  children: ReactNode | JSX.Element;
  theme?: 'light' | 'dark';
  display?: 'inline' | 'block';
}
