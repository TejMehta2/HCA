import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface MasonryCardProps {
  title?: JSX.Element;
  copy?: JSX.Element;
  cta?: JSX.Element;
  image?: JSX.Element;
  rows: 1 | 2;
  columns: 3 | 6;
}

export interface MasonryCardsProps {
  subtitle?: JSX.Element;
  title?: JSX.Element;
  body?: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  id?: string;
  cta?: ReactNode | JSX.Element;
  theme: Theme;
  tableOfContentTitle?: string;
}
