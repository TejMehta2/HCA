import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CTABlockProps {
  subheader?: ReactNode | JSX.Element;
  header?: ReactNode | JSX.Element;
  bodyCopy?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}

export interface DualCTABlockProps {
  content?: ReactNode | JSX.Element;
  theme: Theme;
  id?: string;
  tableOfContentTitle?: string;
}
