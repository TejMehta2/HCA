import { ReactNode, type JSX } from 'react';

export interface CardServiceProps {
  children: ReactNode | JSX.Element;
  link: ReactNode | JSX.Element;
}
