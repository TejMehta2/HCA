/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, type JSX } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface AccordionProps {
  title: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  contentVariation?: 'filters';
  headingRef?: any;
}
export type Accordions = AccordionProps[];

export interface AccordionsProps {
  accordions: Accordions;
  openIcon?: IconName;
  closeIcon?: IconName;
  id?: string;
  headingRef?: any;
  isFilters?: boolean;
}
