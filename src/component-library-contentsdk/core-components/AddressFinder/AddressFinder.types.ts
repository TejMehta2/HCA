import { type JSX } from 'react';
export interface FindAddressData {
  address: string;
  postcode: string;
  id: string;
}

export interface FindAddressResponse {
  category: 'postcode';
  data: FindAddressData[];
}

export interface SpiltAddressResponse {
  address1: string;
  address2: string;
  county: string;
  postcode: string;
  town: string;
}

export interface FormField {
  name: string;
  label: string;
}

export interface AddressFinderProps {
  defaultStep?: 'manual' | 'automatic';
  error?: string;
  render: (spiltAddressResponse?: SpiltAddressResponse) => JSX.Element;
  findAddressEndpoint?: string;
  splitAddressEndpoint?: string;
}
