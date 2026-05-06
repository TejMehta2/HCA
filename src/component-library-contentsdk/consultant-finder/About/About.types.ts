import { ReactNode, type JSX } from 'react';

export interface AboutProps {
  children?: ReactNode | JSX.Element;
  title?: string;
  description: string;
}
