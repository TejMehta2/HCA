export type CarouselReviewsTheme = 'F-HCA-White' | 'K-HCA-Turquoise-5';

export interface CarouselReviewsProps {
  rating: number;
  reviewCount: JSX.Element;
  children?: JSX.Element[];
  theme: CarouselReviewsTheme;
}
