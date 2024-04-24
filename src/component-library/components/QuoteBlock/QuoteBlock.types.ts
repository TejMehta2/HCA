import { ReactNode } from 'react';

export interface QuoteBlockProps {
  children: ReactNode | JSX.Element | string;
  author?: {
    name?: ReactNode | JSX.Element;
    image?: ReactNode | JSX.Element;
    tag?: ReactNode | JSX.Element;
  };
}
