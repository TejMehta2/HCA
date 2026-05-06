import { Theme } from '../../foundation/Themes/Themes.types';

export interface CarouselReviewsProps {
  rating: number;
  reviewCount: JSX.Element;
  children?: JSX.Element[];
  theme: Theme;
  id?: string;
  tableOfContentTitle?: string;
  image?: JSX.Element;
}
