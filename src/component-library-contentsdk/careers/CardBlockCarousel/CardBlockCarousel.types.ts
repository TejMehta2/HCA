import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CardProps {
  image?: JSX.Element | ReactNode;
  icon: JSX.Element | ReactNode;
  title: JSX.Element | ReactNode;
  bodyText: JSX.Element | ReactNode;
}

export interface CardBlockCarouselProps {
  theme?: Theme;
  id?: string;
  subtitle: JSX.Element | ReactNode;
  title: JSX.Element | ReactNode;
  bodyText: JSX.Element | ReactNode;
  cards: CardProps[];
  tableOfContentTitle?: string;
}
