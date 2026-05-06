import { type JSX } from 'react';
export interface ContactItem {
  title: JSX.Element;
  number: JSX.Element | JSX.Element[];
  icon: JSX.Element;
  openingHours: JSX.Element;
}

export interface ContactListProps {
  items: ContactItem[];
}
