import { ReactNode } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface AccordionProps {
  title: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  onShow: () => void;
  isActive: boolean;
  closeIcon?: IconName;
  openIcon?: IconName;
  accordionClass?: string;
}
