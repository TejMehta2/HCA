import { type JSX } from 'react';
export interface AccreditationsProps {
  items?: {
    title?: JSX.Element;
    text: JSX.Element;
    logo: JSX.Element;
  }[];
  columns?: 2 | 3;
  contentVariation?: string | undefined;
}
