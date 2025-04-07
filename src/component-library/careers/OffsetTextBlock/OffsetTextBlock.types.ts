import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface OffsetTextBlockProps {
  theme?: Theme;
  title?: ReactNode | JSX.Element;
  bodyCopy?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
  id?: string;
}
