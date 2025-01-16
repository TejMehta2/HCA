import { ReactNode } from 'react';

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
  children?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}
