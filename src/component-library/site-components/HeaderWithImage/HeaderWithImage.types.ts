import { Theme } from '../../foundation/Themes/Themes.types';

export interface HeaderWithImageProps {
  title: JSX.Element;
  copy: JSX.Element;
  ctas: JSX.Element;
  image: JSX.Element;
  theme: Theme;
  /* TODO themes from BE to only take specific theme types
    | 'D-HCA-Teal'
    | 'F-HCA-Fern'
    | 'I-HCA-Goldenrod'
    | 'H-HCA-Tangerine'
    | 'B-HCA-Navy-Blue'
    | 'K-HCA-Fern-20'
    | 'K-HCA-Fern-20'
   */
}
