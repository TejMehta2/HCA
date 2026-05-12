import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface TextBlockProps {
  theme?: Theme;
  subheading?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  text?: ReactNode | JSX.Element;
  ctas?: ReactNode | JSX.Element;
  image?: JSX.Element;
  textWidth?: 'standard' | 'narrow';
  contentVariation?: 'centered';
  id?: string;
  tableOfContentTitle?: string;
  isInsideContainer?: boolean;
}
