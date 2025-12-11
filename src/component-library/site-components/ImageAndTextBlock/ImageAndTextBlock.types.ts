import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export type imageAlignmentTypes = 'right' | 'left';
type lengthTypes = 'short' | 'long';
export type iconList = {
  icon: ReactNode | JSX.Element;
  text: JSX.Element | string;
}[];

export interface ImageAndTextBlockProps {
  header: ReactNode | JSX.Element;
  image: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  subheader?: ReactNode | JSX.Element;
  ctas?: JSX.Element;
  imageAlignment?: imageAlignmentTypes;
  imageVerticalAlignment?: 'top' | 'center';
  imageWidth?: 'standard' | 'narrow';
  imageNoStretch?: boolean;
  imageKeepAspectRatio?: boolean;
  length?: lengthTypes;
  theme: Theme;
  ratings?: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
  iconList?: iconList;
  hideImageOnMobile?: boolean;
  cfVariation?: boolean;
  contentVariation?: 'pricing' | 'hero' | 'hero-cf';
  noOverflownHidden?: boolean;
  id?: string;
  tableOfContentTitle?: string;
}
