import { type Theme } from './Themes.types';

export type ThemeMode = 'dark' | 'light';

export const themeModes: Record<Theme, ThemeMode> = {
  'A-HCA-White': 'dark',
  'B-HCA-Navy-Blue': 'light',
  'C-HCA-Denim': 'light',
  'D-HCA-Teal': 'dark',
  'E-HCA-Cerulean': 'dark',
  'F-HCA-Fern': 'dark',
  'G-HCA-Orange': 'dark',
  'H-HCA-Tangerine': 'dark',
  'I-HCA-Goldenrod': 'dark',
  'J-HCA-Tangerine-20': 'dark',
  'K-HCA-Fern-20': 'dark',
  'L-HCA-Teal-5': 'dark',
  'M-HCA-Goldenrod-20': 'dark',
  'N-HCA-Denim-5': 'dark',
  'O-HCA-Teal-20': 'dark',
  'Palace-White': 'dark',
  'Palace-Grey': 'light',
  'Palace-Beige': 'dark',
  'Palace-Red': 'light',
  'Chelsea-White': 'dark',
  'Chelsea-Navy-Blue': 'light',
  'Chelsea-Beige': 'dark',
  'Chelsea-Gold': 'dark',
  LBI: 'dark',
  'LBI-Dark': 'dark',
  'LBI-White': 'light',
  'Alan-Black': 'light',
  'Alan-White': 'dark',
  'Alan-Light-Grey': 'dark',
};

export const getThemeMode = (theme: Theme): ThemeMode => themeModes[theme];
