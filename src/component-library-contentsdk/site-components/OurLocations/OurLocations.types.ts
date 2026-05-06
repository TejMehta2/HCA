import { type JSX } from 'react';
import { AdvancedBlockHeaderProps } from '../../components/AdvancedBlockHeader/AdvancedBlockHeader.types';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface Location {
  card: JSX.Element; // Usually a CardLocation
  // number values are percentage of main map image
  mapScale: number;
  mapX: number;
  mapY: number;
  theme: Theme;
}

export interface OurLocationsProps {
  headerProps: AdvancedBlockHeaderProps;
  locations: Location[];
  mapAspectRatio: number; // file aspect ratio or w / h
  scrollSensitivity?: number; // (vh) how far user has to scroll per step
  theme?: Theme;
  mapImage?: JSX.Element;
  id?: string;
  tableOfContentTitle?: string;
}
