import { type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CardBlockProps {
  header?: JSX.Element;
  children?: JSX.Element;
  theme: Theme;
  variation: 'side-by-side' | '2-columns' | '3-columns' | '4-columns';
  gapSize?: 'small' | 'large';
  cta?: JSX.Element;
  id?: string;
  tableOfContentTitle?: string;
}
