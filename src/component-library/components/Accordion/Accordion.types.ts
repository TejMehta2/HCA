import { ReactNode } from 'react';

export interface AccordionProps {
  title: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
  onShow: () => void;
  isActive: boolean;
}
