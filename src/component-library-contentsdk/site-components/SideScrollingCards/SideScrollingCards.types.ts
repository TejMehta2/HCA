import { ReactNode } from 'react';

export interface SideScrollingCardsProps {
  title: JSX.Element;
  bodyCopy: JSX.Element;
  link: JSX.Element | undefined;
  children: JSX.Element | ReactNode;
  id?: string;
  tableOfContentTitle?: string;
}
