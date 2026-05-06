import { type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface ArticleCategoriesProps {
  theme: Theme;
  title: JSX.Element;
  categories?: JSX.Element[];
  id?: string;
  tableOfContentTitle?: string;
}
