import { ReactNode } from 'react';

type imageAlignmentTypes = 'right' | 'left';
type lengthTypes = 'short' | 'long';

export interface ImageAndTextBlockProps {
  header: ReactNode | JSX.Element;
  image: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  subheader?: ReactNode | JSX.Element;
  ctas?: {
    button1?: JSX.Element;
    button2?: JSX.Element;
    button2Text?: JSX.Element;
  };
  imageAlignment?: imageAlignmentTypes;
  length?: lengthTypes;
}
