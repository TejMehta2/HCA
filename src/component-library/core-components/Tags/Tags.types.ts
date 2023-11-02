import { ReactNode } from 'react';

export interface TagsProps {
  theme?: 'green' | 'dark-blue' | 'orange' | 'white' | 'main-turquoise';
  children: ReactNode | JSX.Element;
}
