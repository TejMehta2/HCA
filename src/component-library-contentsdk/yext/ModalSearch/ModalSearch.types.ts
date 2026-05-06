import { ReactNode, type JSX } from 'react';

export interface ModalSearchProps {
  id?: string;
  suggestions?: {
    icon?: JSX.Element | ReactNode;
    text?: JSX.Element | ReactNode;
    query?: string;
  }[];
  defaultOpen?: boolean;
  placeholder?: string;
  subheading?: JSX.Element;
  redirectUrl?: string;
}
