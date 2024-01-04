import { Theme } from '../../foundation/Themes/Themes.types';

export interface HeaderWithImageProps {
  title: JSX.Element;
  copy: JSX.Element;
  ctas: JSX.Element;
  image: JSX.Element;
  theme: Extract<Theme, 'a' | 'b' | 'c' | 'd' | 'e' | 'g' | 'h'>;
}
