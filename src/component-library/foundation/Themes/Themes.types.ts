import { ReactNode } from 'react';

export type Theme =
  | 'A-HCA-Main-Turquoise'
  | 'B-HCA-Green'
  | 'C-HCA-Beige'
  | 'D-HCA-Light-Orange'
  | 'E-HCA-Dark-Grey'
  | 'F-HCA-White'
  | 'G-HCA-Green-40'
  | 'H-HCA-Green-20'
  | 'I-HCA-Turquoise-20'
  | 'J-HCA-Turquoise-10'
  | 'K-HCA-Turquoise-5'
  | 'L-HCA-Coral-60';
export interface ThemesProps {
  children?: ReactNode | JSX.Element;
  tag?: keyof JSX.IntrinsicElements;
  theme: Theme;
}
