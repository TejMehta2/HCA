import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface LogoBlockProps {
  header?: ReactNode | JSX.Element;
  logos?: JSX.Element[];
  theme?: Theme;
  variation?: 'standard' | 'side-by-side';
  columns?: 3 | 4;
  id?: string;
  tableOfContentTitle?: string;
}
