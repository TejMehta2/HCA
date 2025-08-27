import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface StatProps {
  stat: string;
  text: string;
}

export interface StatsCardsProps {
  theme: Theme;
  id?: string;
  subheader?: ReactNode | JSX.Element;
  header: ReactNode | JSX.Element;
  bodyCopy: ReactNode | JSX.Element;
  stats: StatProps[];
  tableOfContentTitle?: string;
}
