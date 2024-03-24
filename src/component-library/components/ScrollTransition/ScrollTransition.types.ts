import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface ScrollTransitionProps {
  initialTheme?: Theme;
  children?: ReactNode | JSX.Element;
  transitionBackground?: boolean;
}
