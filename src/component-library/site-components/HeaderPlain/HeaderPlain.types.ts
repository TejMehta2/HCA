import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface HeaderPlainProps {
  children: ReactNode | JSX.Element;
  heading: ReactNode | JSX.Element;
  subheading?: ReactNode | JSX.Element;
  search?: ReactNode | JSX.Element;
  theme?: Theme;
}
