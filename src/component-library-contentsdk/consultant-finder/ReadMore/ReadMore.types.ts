import { ReactNode, type JSX } from 'react';

export interface ReadMoreProps {
  children?: ReactNode | JSX.Element;
  maxContent?: number;
  tag?: string;
  showMoreText: string;
  showLessText: string;
  iconShowMore?: ReactNode | JSX.Element;
  iconShowLess?: ReactNode | JSX.Element;
}
