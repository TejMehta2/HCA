import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface MarketingPreferencesProps {
  children?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  bodyCopy?: ReactNode | JSX.Element;
  preferences?: ReactNode | JSX.Element;
  theme?: Theme;
}
