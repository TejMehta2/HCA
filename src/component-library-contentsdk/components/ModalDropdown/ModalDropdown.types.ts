import { ReactNode, type JSX } from 'react';

export interface ModalDropdownProps {
  children?: ReactNode | JSX.Element;
  defaultOpen?: boolean;
  contentVariation?: 'no-transition';
}
