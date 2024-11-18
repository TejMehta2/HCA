import { ReactNode } from 'react';

export interface StatsProps {
  children?: ReactNode | JSX.Element;
  heading?: ReactNode | JSX.Element;
  variant?: 'threeCol';
}
