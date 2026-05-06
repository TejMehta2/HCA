import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface VideoBlockProps {
  header?: ReactNode | JSX.Element;
  theme?: Theme;
  variation?: 'standard' | 'side-by-side';
  video: ReactNode | JSX.Element;
  id?: string;
  tableOfContentTitle?: string;
}
