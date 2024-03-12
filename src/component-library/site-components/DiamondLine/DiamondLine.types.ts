import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface DiamondLineProps {
  children?: ReactNode | JSX.Element;
  side?: 'left' | 'right';
  theme?: Theme;
}
