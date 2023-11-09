import { ReactNode } from 'react';

export interface ModalsProps {
  children?: ReactNode | JSX.Element;
  defaultOpen?: true;
  variation?: 'right' | 'full';
}
