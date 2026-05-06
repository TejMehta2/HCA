import { type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CarouselCardsProps {
  theme: Theme;
  cardsToDisplay?: 3 | 4;
  title?: JSX.Element;
  subtitle?: JSX.Element;
  link?: JSX.Element | undefined;
  children?: JSX.Element[];
  bodyCopy?: JSX.Element;
  id?: string;
  tableOfContentTitle?: string;
}
