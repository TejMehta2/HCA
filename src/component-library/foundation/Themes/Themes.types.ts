import { ReactNode } from 'react';

export type themeType =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l';
export interface ThemesProps {
  children?: ReactNode | JSX.Element;
  tag?: keyof JSX.IntrinsicElements;
  theme: themeType;
}
