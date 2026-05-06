import { ReactNode, type JSX } from 'react';
export interface CQCBlockProps {
  logo: {
    dark: ReactNode | JSX.Element;
    light: ReactNode | JSX.Element;
  };
  title?: string;
  text?: string;
  icon: ReactNode | JSX.Element;
  length?: 'short' | 'long';
  rating?: 'Outstanding' | 'Good' | 'Requires improvement' | 'Inadequate';
  link: ReactNode | JSX.Element;
}
