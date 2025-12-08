import { ReactNode } from 'react';

export type Theme =
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
  | 'N-HCA-Denim-5'
  | 'O-HCA-Teal-20'
  | 'Palace-White'
  | 'Palace-Navy-Blue'
  | 'Palace-Beige'
  | 'Chelsea-White'
  | 'Chelsea-Navy-Blue'
  | 'Chelsea-Beige'
  | 'LBI';
export interface ThemesProps {
  children?: ReactNode | JSX.Element;
  tag?: keyof JSX.IntrinsicElements;
  theme: Theme;
  topLevelTheme?: Theme;
  id?: string;
  collapse?: boolean;
  tableOfContentTitle?: string | null;
}
