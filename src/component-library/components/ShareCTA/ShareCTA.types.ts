import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface ShareCTAProps {
  shareData: {
    url: string;
    title: string;
    text: string;
  };
  shareCtaText: ReactNode | JSX.Element;
  heading: ReactNode | JSX.Element;
  subheading?: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  theme: Theme;
}
