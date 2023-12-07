import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CTABlockProps {
  header: ReactNode | JSX.Element;
  subheader: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  ctas?: {
    button1?: ReactNode | JSX.Element;
    button2?: ReactNode | JSX.Element;
    button3?: ReactNode | JSX.Element;
  };
  theme: Theme;
}
