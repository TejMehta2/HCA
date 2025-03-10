import { ReactNode } from 'react';

export interface TextBlockProps {
  subheading?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  text?: ReactNode | JSX.Element;
  ctas?: ReactNode | JSX.Element;
  contentVariation?: 'centered';
}
