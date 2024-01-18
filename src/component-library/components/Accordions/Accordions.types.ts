import { ReactNode } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';

export type Accordions = {
  title: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  contentVariation?: 'filters';
}[];

export interface AccordionsProps {
  accordions: Accordions;
  openIcon?: IconName;
  closeIcon?: IconName;
}
