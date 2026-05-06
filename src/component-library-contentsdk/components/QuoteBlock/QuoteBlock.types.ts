import { ReactNode } from 'react';

export interface QuoteBlockProps {
  alignment?: 'left' | 'center';
  children?: ReactNode | JSX.Element | string;
  author?: {
    name?: ReactNode | JSX.Element | string;
    image?: ReactNode | JSX.Element;
    tag?: ReactNode | JSX.Element | string;
  };
  title?: ReactNode | JSX.Element | string;
  wrapper?: boolean;
}
