import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface SearchWrapperProps {
  header?: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  searchDetail?: ReactNode | JSX.Element;
  showing?: ReactNode | JSX.Element;
  theme: Theme;
}
