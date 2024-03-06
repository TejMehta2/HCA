import { ReactNode } from 'react';

export interface SearchResultArticleProps {
  image?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  copy?: ReactNode | JSX.Element;
  ctas?: {
    link?: ReactNode | JSX.Element;
    email?: ReactNode | JSX.Element;
  };
}
