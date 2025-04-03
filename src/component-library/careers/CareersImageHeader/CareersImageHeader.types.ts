import { ReactNode } from 'react';

export interface CareersImageHeaderProps {
  subtitle?: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element;
  bodyCopy?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
  image?: ReactNode | JSX.Element;
}
