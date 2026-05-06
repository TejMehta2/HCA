import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

interface SlideProps {
  body: JSX.Element | ReactNode;
  image: JSX.Element | ReactNode;
  thumbnail: JSX.Element | ReactNode;
  name: JSX.Element | ReactNode;
  role: JSX.Element | ReactNode;
}

export interface CarouselTestimonialsProps {
  id?: string;
  theme?: Theme;
  subtitle?: JSX.Element | ReactNode;
  title: JSX.Element | ReactNode;
  slides: SlideProps[];
  tableOfContentTitle?: string;
}
