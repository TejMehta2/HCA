import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface ModalTextProps {
  theme: Theme;
  title1: ReactNode | JSX.Element;
  body1: ReactNode | JSX.Element;
  title2: ReactNode | JSX.Element;
  body2: ReactNode | JSX.Element;
  defaultOpen?: boolean;
}
