import { ReactNode } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface AccordionsProps {
  header?: ReactNode | JSX.Element;
  accordions: {
    title: ReactNode | JSX.Element;
    children: ReactNode | JSX.Element;
  }[];
  cta?: ReactNode | JSX.Element;
  openIcon?: IconName;
  closeIcon?: IconName;
}
