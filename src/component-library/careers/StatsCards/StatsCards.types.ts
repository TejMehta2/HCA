import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface StatProps {
  stat: ReactNode | JSX.Element;
  text: ReactNode | JSX.Element;
}

export interface StatsCardsProps {
  theme: Theme;
  id?: string;
  subheader?: ReactNode | JSX.Element;
  header: ReactNode | JSX.Element;
  bodyCopy: ReactNode | JSX.Element;
  stats: StatProps[];
}
