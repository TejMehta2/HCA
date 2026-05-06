import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CardBlogBlockProps {
  children?: ReactNode | JSX.Element;
  cta?: JSX.Element;
  title?: JSX.Element;
  theme: Theme;
  id?: string;
  tableOfContentTitle?: string;
}
