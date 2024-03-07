import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface BlogContentProps {
  theme: Theme;
  children?: ReactNode | JSX.Element;
  contentVariation?: 'quote';
}
