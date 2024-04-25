import { ReactNode } from 'react';

export interface BreadcrumbsProps {
  children?: JSX.Element | ReactNode;
  backCta?: {
    link?: string;
    text?: string;
  };
}
