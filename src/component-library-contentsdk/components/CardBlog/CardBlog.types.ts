import { ReactNode } from 'react';

export interface CardBlogProps {
  children?: ReactNode | JSX.Element;
  variation?: 'default' | 'feature';
}
