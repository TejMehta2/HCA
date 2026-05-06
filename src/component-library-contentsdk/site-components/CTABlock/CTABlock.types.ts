import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CTABlockProps {
  header: ReactNode | JSX.Element;
  subheader: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  ctas?: ReactNode | JSX.Element;
  theme: Theme;
  id?: string;
  tableOfContentTitle?: string;
}
