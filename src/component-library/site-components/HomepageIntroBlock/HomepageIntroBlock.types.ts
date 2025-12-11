import { Theme } from '../../foundation/Themes/Themes.types';

export interface HomepageIntroBlockProps {
  imageAlignment?: 'left' | 'right';
  title: JSX.Element;
  subtitle?: JSX.Element;
  copy: JSX.Element;
  stats: { value: JSX.Element; label: JSX.Element }[];
  cta: JSX.Element;
  image: JSX.Element;
  cqc: JSX.Element;
  doctify?: JSX.Element;
  children?: JSX.Element;
  id?: string;
  imageKeepAspectRatio?: boolean;
  theme: Theme;
  tableOfContentTitle?: string;
}
