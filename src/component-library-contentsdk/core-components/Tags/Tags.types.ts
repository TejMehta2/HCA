import { ReactNode } from 'react';

export interface TagsProps {
  theme?: 'green' | 'dark-blue' | 'orange' | 'white' | 'blue' | 'coral';
  children: ReactNode | JSX.Element;
  contentVariation?: 'quote';
}
