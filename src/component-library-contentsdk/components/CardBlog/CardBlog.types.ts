import { ReactNode, type JSX } from 'react';

export interface CardBlogProps {
  children?: ReactNode | JSX.Element;
  variation?: 'default' | 'feature';
}
