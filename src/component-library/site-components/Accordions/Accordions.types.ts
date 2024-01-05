import { ReactNode } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';

export type accordions = {
  title: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
}[];

export interface AccordionsProps {
  header?: ReactNode | JSX.Element;
  accordions: accordions;
  cta?: ReactNode | JSX.Element;
  openIcon?: IconName;
  closeIcon?: IconName;
}
