import { ReactNode } from 'react';

export interface ServiceCardsProps {
  children: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element;
  subtitle: ReactNode | JSX.Element;
  bodyText: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}
