import { ReactNode, type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface CardDoctorLayoutProps {
  title: JSX.Element;
  children?: JSX.Element | ReactNode;
  cta: JSX.Element;
  theme: Theme;
  id?: string;
  tableOfContentTitle?: string;
}
