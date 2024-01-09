import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';

type imageAlignmentTypes = 'right' | 'left';
type lengthTypes = 'short' | 'long';

export interface ImageAndTextBlockProps {
  header: ReactNode | JSX.Element;
  image: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  subheader?: ReactNode | JSX.Element;
  ctas?: {
    button1?: ReactNode | JSX.Element;
    button2?: ReactNode | JSX.Element;
  };
  imageAlignment?: imageAlignmentTypes;
  length?: lengthTypes;
  theme: Theme;
  ratings?: ReactNode | JSX.Element | ReactNode[] | JSX.Element[];
  amenities?: {
    icon: ReactNode | JSX.Element;
    text: string;
  }[];
}
