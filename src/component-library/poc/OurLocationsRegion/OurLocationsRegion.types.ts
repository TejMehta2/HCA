import { CSSProperties } from 'react';
import { CardLocationProps } from '../CardLocation/CardLocation.types';

export interface RegionImageProps {
  src: string;
  alt: string;
  classNames?: string;
  imgStyle?: CSSProperties;
}

export interface OurLocationsRegionProps {
  id: number;
  theme: CardLocationProps['theme'];
  name: string;
  amount: string;
  area: { mobile: string; desktop?: string };
  mapStyles: CSSProperties;
  cardStyles: CSSProperties;
  activeRegion?: boolean;
  onFocus?: (id: number) => void;
}
