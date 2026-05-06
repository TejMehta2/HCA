import { ReactNode } from 'react';

export interface ModalDropdownProps {
  children?: ReactNode | JSX.Element;
  defaultOpen?: boolean;
  contentVariation?: 'no-transition';
}
