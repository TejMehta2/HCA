import { type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface HeaderProfileProps {
  theme?: Theme;
  image?: JSX.Element;
  title?: JSX.Element;
  department?: JSX.Element;
  ctas?: JSX.Element;
}
