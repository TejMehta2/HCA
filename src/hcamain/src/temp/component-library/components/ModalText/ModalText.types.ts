import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface ModalTextProps {
  theme?: Theme;
  title1: ReactNode | JSX.Element;
  copy1: ReactNode | JSX.Element;
  title2: ReactNode | JSX.Element;
  copy2: ReactNode | JSX.Element;
  defaultOpen?: boolean;
  cta1?: ReactNode | JSX.Element;
  cta2?: ReactNode | JSX.Element;
}
