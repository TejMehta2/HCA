import { type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface FooterColumn {
  title?: JSX.Element | string;
  links?: JSX.Element[];
  reviews?: JSX.Element[];
  socials?: JSX.Element[];
}

export interface FooterProps {
  theme?: Theme;
  buttons: JSX.Element;
  logo: any;
  noLogo?: any;
  columns: FooterColumn[];
  legals?: JSX.Element[];
  copyright?: JSX.Element;
  contact?: {
    internationalPhoneNumber: string | undefined;
    phoneNumber: string | undefined;
    unitName: string | undefined;
  };
}
