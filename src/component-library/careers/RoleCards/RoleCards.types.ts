import { ReactNode } from 'react';

export interface RoleCardsProps {
  children?: JSX.Element[];
  title: ReactNode | JSX.Element;
  subtitle: ReactNode | JSX.Element;
  bodyText: ReactNode | JSX.Element;
  id?: string;
}
