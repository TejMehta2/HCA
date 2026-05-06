import { type JSX } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface HeaderWithImageProps {
  title: JSX.Element;
  subtitle?: JSX.Element;
  subtitlePlacement?: 'before' | 'after';
  copy: JSX.Element;
  ctas: JSX.Element;
  image: JSX.Element;
  theme: Theme;
  ratings?: JSX.Element;
  noMask?: boolean;
  contentVariation?: 'fullWidthImage';
  textWidth?: 'standard' | 'wide';
}
