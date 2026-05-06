import { Theme } from '../../foundation/Themes/Themes.types';

interface SlideProps {
  title: JSX.Element;
  body: JSX.Element;
  image?: JSX.Element | null;
}

export interface CarouselContentProps {
  slides: SlideProps[];
  theme: Theme;
  id?: string;
  tableOfContentTitle?: string;
}
