import { ReactNode } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface AccordionProps {
  title: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  contentVariation?: 'filters';
}
export type Accordions = AccordionProps[];

export interface AccordionsProps {
  accordions: Accordions;
  openIcon?: IconName;
  closeIcon?: IconName;
  id?: string;
}
