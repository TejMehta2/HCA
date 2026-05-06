import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface BlogContentProps {
  theme: Theme;
  children?: ReactNode | JSX.Element;
  imageKeepAspectRatio?: boolean;
  contentVariation?: 'quote-center' | 'quote' | 'image';
  id?: string;
  tableOfContentTitle?: string;
}
