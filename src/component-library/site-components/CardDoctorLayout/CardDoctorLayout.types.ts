import { Theme } from '../../foundation/Themes/Themes.types';

export interface CardDoctorLayoutProps {
  title: JSX.Element;
  children?: JSX.Element[];
  cta: JSX.Element;
  theme: Theme;
}
