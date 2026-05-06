import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface BreadcrumbsProps {
  theme?: Theme;
  collapse?: boolean;
  children?: JSX.Element | ReactNode;
  backCta?: {
    link?: string;
    text?: string;
  };
}
