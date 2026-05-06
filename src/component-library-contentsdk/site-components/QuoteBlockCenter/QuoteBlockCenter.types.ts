import { ReactNode } from 'react';

export interface QuoteBlockCenterProps {
  children?: ReactNode | JSX.Element | string;
  author?: {
    name?: ReactNode | JSX.Element | string;
    image?: ReactNode | JSX.Element;
    tag?: ReactNode | JSX.Element | string;
  };
  alignment?: 'left' | 'center';
}
