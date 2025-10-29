import { ReactNode } from 'react';

export interface HeaderPlainProps {
  children?: ReactNode | JSX.Element;
  heading: ReactNode | JSX.Element;
  metatitle?: ReactNode | JSX.Element;
  description?: ReactNode | JSX.Element;
  contentVariation?: 'padding-small';
  subtitle?: ReactNode | JSX.Element;
  image?: ReactNode | JSX.Element;
  subtitlePlacement?: 'before' | 'after';
}
