import { ReactNode } from 'react';

type TextButtonThemeUnionTypes = 'dark' | 'light';
export interface TextButtonProps {
  theme?: TextButtonThemeUnionTypes;
  children?: ReactNode | JSX.Element;
}
