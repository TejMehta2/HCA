/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, type JSX } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface AccordionProps {
  title: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  onShow: () => void;
  isActive: boolean;
  closeIcon?: IconName;
  openIcon?: IconName;
  contentVariation?: 'filters';
  headingRef?: any;
  id?: any;
}
