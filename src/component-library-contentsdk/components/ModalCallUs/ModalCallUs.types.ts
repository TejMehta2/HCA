import { type JSX } from 'react';
export interface phone {
  text?: string;
  number?: string;
}

export interface Contact {
  title?: JSX.Element | string;
  phone?: phone;
  availability?: JSX.Element | undefined;
}

export interface ModalCallUsProps {
  contacts: Contact[];
  defaultOpen?: boolean;
  contentVariation?: 'EqualSizeNumbers';
}
