import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface OffsetTextBlockProps {
  theme?: Theme;
  subheading?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  bodyCopy?: ReactNode | JSX.Element;
  ctas?: ReactNode | JSX.Element;
  id?: string;
  tableOfContentTitle?: string;
}
