import { Theme } from '../../foundation/Themes/Themes.types';

export interface CardBlockProps {
  subtitle?: JSX.Element;
  title?: JSX.Element;
  copy?: JSX.Element;
  ctas?: JSX.Element;
  children: JSX.Element;
  theme: Theme;
  variation: 'side-by-side' | '3-columns' | '4-columns';
  gapSize?: 'small' | 'large';
}
