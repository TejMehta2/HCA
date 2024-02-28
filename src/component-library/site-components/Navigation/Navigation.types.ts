import { Theme } from '../../foundation/Themes/Themes.types';

export interface NavigationEyebrow {
  left?: JSX.Element;
  right?: JSX.Element;
}

export interface TabContent {
  variation?: 'single-narrow' | 'single-wide' | 'double' | 'single';
  template:
    | 'Navigation Content Block'
    | 'Main Navigation Links List'
    | 'Navigation Blog Post Card';
  heading?: string;
  description?: JSX.Element;
  date?: JSX.Element;
  tag?: JSX.Element;
  links?: JSX.Element[];
  cta?: JSX.Element;
  mobileCta?: JSX.Element;
}

export interface NavigationTab {
  heading: string;
  tabCta?: JSX.Element;
  mobileTabCta?: JSX.Element;
  content: TabContent[];
  hasChildren?: boolean;
}
export interface NavigationProps {
  eyebrow?: NavigationEyebrow;
  tabs: NavigationTab[];
  themeOpen?: Theme;
  themeClosed?: Theme;
  defaultTab?: number;
  search?: JSX.Element;
}
