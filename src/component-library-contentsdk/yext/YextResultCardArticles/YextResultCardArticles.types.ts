import { ReactNode, type JSX } from 'react';

export interface YextResultCardArticlesProps {
  image?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  copy?: ReactNode | JSX.Element;
  ctas?: {
    button?: ReactNode | JSX.Element;
    textButton?: ReactNode | JSX.Element;
  };
}
