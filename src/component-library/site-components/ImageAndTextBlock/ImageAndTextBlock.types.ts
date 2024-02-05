import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

export type imageAlignmentTypes = 'right' | 'left';
type lengthTypes = 'short' | 'long';
export type iconList = {
  icon: ReactNode | JSX.Element;
  text: string;
}[];

export type contactList = {
  title: JSX.Element;
  number: JSX.Element;
  icon: JSX.Element;
  openingHours: JSX.Element;
}[];

export interface ImageAndTextBlockProps {
  header: ReactNode | JSX.Element;
  image: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  subheader?: ReactNode | JSX.Element;
  ctas?: JSX.Element;
  imageAlignment?: imageAlignmentTypes;
  length?: lengthTypes;
  theme: Theme;
  ratings?: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
  iconList?: iconList;
  contactList?: contactList;
}
