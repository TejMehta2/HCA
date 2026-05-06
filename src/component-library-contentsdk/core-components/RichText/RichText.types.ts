import { ReactNode, type JSX } from 'react';

export interface RichTextProps {
  children?: ReactNode | JSX.Element;
  additionalStyles?: string | string[];
  id?: string;
  imageKeepAspectRatio?: boolean;
  tableOfContentTitle?: string;
}
