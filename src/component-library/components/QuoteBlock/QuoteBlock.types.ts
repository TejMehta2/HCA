import { ReactNode } from 'react';

export interface QuoteBlockProps {
  children: ReactNode | JSX.Element | string;
  author?: {
    name?: string;
    image?: ReactNode | JSX.Element;
    tag?: ReactNode | JSX.Element;
  };
}
