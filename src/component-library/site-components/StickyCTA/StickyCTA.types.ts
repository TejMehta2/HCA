import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface StickyCTAProps {
  children?: ReactNode | JSX.Element;
  theme?: Theme;
  cta?: ReactNode | JSX.Element;
}
