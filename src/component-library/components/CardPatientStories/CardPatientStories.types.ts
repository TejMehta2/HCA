import { Theme } from '../../foundation/Themes/Themes.types';

export interface CardPatientStoriesProps {
  image?: JSX.Element;
  title: JSX.Element;
  bodyCopy?: JSX.Element;
  link: JSX.Element;
  theme?: Theme;
}
