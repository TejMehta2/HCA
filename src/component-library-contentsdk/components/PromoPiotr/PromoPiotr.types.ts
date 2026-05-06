import { ReactNode } from 'react';

export interface PromoPiotrProps {
  id?: string;
  image: JSX.Element;
  richText: JSX.Element;
  link: JSX.Element;
  children: ReactNode;
}
