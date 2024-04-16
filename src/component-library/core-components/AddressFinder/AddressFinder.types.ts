import { ReactNode } from 'react';

export interface addressResult {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}
export interface AddressFinderProps {
  children?: ReactNode | JSX.Element;
  helpText?: string;
  addressResults?: addressResult[];
}
