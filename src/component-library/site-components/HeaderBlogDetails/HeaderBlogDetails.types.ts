import { Theme } from '../../foundation/Themes/Themes.types';

export interface HeaderBlogDetailsProps {
  theme: Theme;
  tag: JSX.Element;
  date: JSX.Element;
  title: JSX.Element;
  bodyCopy?: JSX.Element;
  authors?: JSX.Element | JSX.Element[];
  lastChecked?: JSX.Element;
}
