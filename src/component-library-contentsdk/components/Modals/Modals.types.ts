import { ReactNode, type JSX } from 'react';

export interface ModalsProps {
  id?: string;
  children?: ReactNode | JSX.Element;
  defaultOpen?: boolean;
  variation?: 'right' | 'full';
  contentVariation?: 'filters' | 'sorting' | 'call';
  alignContent?: 'center';
}
