import { ReactNode } from 'react';

type ButtonSizeUnionTypes = 'small' | 'large';
export type ButtonVariationUnionTypes =
  | 'full'
  | 'outline'
  | 'social'
  | 'standard-carousel'
  | 'full-dark'
  | 'full-light'
  | 'outline-dark'
  | 'outline-light'
  | 'full-light-blue'
  | 'social-light'
  | 'social-dark'
  | 'standard-carousel-light'
  | 'standard-carousel-dark'
  | 'hover-carousel'
  | 'square-outline'
  | 'play'
  | 'filter'
  | 'jump-to';

export interface ButtonProps {
  size: ButtonSizeUnionTypes;
  variation: ButtonVariationUnionTypes;
  children?: ReactNode | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  loading?: boolean;
  contentVariation?: 'full-width' | 'card' | 'search';
}
