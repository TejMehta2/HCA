import { ReactNode } from 'react';

export type Theme =
  | 'D-HCA-Teal'
  | 'F-HCA-Fern'
  | 'I-HCA-Goldenrod'
  | 'D-HCA-Light-Orange'
  | 'B-HCA-Navy-Blue'
  | 'A-HCA-White'
  | 'G-HCA-Green-40'
  | 'I-HCA-Turquoise-20'
  | 'J-HCA-Turquoise-10'
  | 'L-HCA-Teal-5'
  | 'G-HCA-Orange'
  | 'A-HCA-White'
  | 'B-HCA-Navy-Blue'
  | 'C-HCA-Denim'
  | 'D-HCA-Teal'
  | 'E-HCA-Cerulean'
  | 'F-HCA-Fern'
  | 'G-HCA-Orange'
  | 'H-HCA-Tangerine'
  | 'I-HCA-Goldenrod'
  | 'J-HCA-Tangerine-20'
  | 'K-HCA-Fern-20'
  | 'L-HCA-Teal-5'
  | 'M-HCA-Goldenrod-20'
  | 'N-HCA-Denim-5';
export interface ThemesProps {
  children?: ReactNode | JSX.Element;
  tag?: keyof JSX.IntrinsicElements;
  theme: Theme;
  topLevelTheme?: Theme;
}
