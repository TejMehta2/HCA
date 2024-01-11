import { Theme } from '../../foundation/Themes/Themes.types';

export interface HeaderWithImageProps {
  title: JSX.Element;
  copy: JSX.Element;
  ctas: JSX.Element;
  image: JSX.Element;
  theme: Theme;
  /* TODO themes from BE to only take specific theme types
    | 'A-HCA-Main-Turquoise'
    | 'B-HCA-Green'
    | 'C-HCA-Beige'
    | 'D-HCA-Light-Orange'
    | 'E-HCA-Dark-Grey'
    | 'G-HCA-Green-40'
    | 'H-HCA-Green-20'
   */
}
