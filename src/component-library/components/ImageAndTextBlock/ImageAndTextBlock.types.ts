import { ReactNode } from 'react';

type imageAlignmentTypes = 'right' | 'left';
type lengthTypes = 'short' | 'long';

export interface ImageAndTextBlockProps {
  header: ReactNode | JSX.Element;
  image: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  subheader?: ReactNode | JSX.Element;
  ctas?: {
    button1?: ReactNode | JSX.Element;
    button2?: {
      button: ReactNode | JSX.Element;
      text: ReactNode | JSX.Element;
    };
  };
  imageAlignment?: imageAlignmentTypes;
  length?: lengthTypes;
  theme: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l';
}
