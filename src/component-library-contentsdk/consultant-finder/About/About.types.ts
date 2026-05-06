import { ReactNode } from 'react';

export interface AboutProps {
  children?: ReactNode | JSX.Element;
  title?: string;
  description: string;
}
