import { ReactNode, type JSX } from 'react';

export interface AddressProps {
  children?: ReactNode | JSX.Element;
  street1: string;
  street2: string;
  city: string;
  postcode: string;
}
