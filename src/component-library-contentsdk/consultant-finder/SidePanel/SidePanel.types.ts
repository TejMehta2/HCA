import { ReactNode, type JSX } from 'react';

export interface SidePanelProps {
  children?: ReactNode | JSX.Element;
  isSticky?: boolean;
  isMobile?: boolean;
  buttons?: ReactNode | JSX.Element;
}
