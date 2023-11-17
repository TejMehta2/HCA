import { ReactNode } from 'react';

export interface CQCBlockProps {
  children?: ReactNode | JSX.Element;
  logo: {
    dark: ReactNode | JSX.Element;
    light: ReactNode | JSX.Element;
  };
  size?: 'short' | 'long';
  rating?: 'Outstanding' | 'Good' | 'Requires improvement' | 'Inadequate';
}
