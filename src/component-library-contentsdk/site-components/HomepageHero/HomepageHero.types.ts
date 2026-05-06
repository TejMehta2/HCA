import { Theme } from '../../foundation/Themes/Themes.types';

export interface HomepageHeroProps {
  theme: Theme;
  title: JSX.Element;
  search: JSX.Element;
  ctaTitle: JSX.Element;
  ctas: JSX.Element;
  image: JSX.Element;
}
