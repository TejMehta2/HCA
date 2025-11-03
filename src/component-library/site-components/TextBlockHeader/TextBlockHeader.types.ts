import { ReactNode } from 'react';

export interface TextBlockHeaderProps {
  children?: ReactNode | JSX.Element;
  id?: string;
  tableOfContentTitle?: string | null;
}
