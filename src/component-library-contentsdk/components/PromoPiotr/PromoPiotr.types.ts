import { ReactNode, type JSX } from 'react';

export interface PromoPiotrProps {
  id?: string;
  image: JSX.Element;
  richText: JSX.Element;
  link: JSX.Element;
  children: ReactNode;
}
