import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface ServiceCardsProps {
  children?: JSX.Element[];
  title: ReactNode | JSX.Element;
  subtitle: ReactNode | JSX.Element;
  bodyText: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
  id?: string;
  theme?: Theme;
  contentVariation?: 'service' | 'role';
  tableOfContentTitle?: string;
}
