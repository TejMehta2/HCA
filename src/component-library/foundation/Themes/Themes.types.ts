import { ReactNode } from 'react';

export interface ThemesProps {
  children?: ReactNode | JSX.Element;
  tag?: keyof JSX.IntrinsicElements;
  theme: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l';
}
