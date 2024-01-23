import { Theme } from '../../foundation/Themes/Themes.types';

export interface CarouselCardsProps {
  theme: Theme;
  title?: JSX.Element;
  link?: JSX.Element;
  children?: JSX.Element[];
}
