import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface ScrollTransitionProps {
  initialTheme?: Theme;
  children?: ReactNode | JSX.Element;
  transitionBackground?: boolean;
}
