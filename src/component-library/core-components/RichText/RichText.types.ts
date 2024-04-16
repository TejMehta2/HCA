import { ReactNode } from 'react';

export interface RichTextProps {
  children?: ReactNode | JSX.Element;
  additionalStyles?: string | string[];
  id?: string;
}
