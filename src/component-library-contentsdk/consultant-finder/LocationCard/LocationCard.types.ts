/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, type JSX } from 'react';

export interface LocationCardProps {
  children?: ReactNode | JSX.Element;
  name: string;
  addressLine1: string;
  city: string;
  postcode: string;
  slug: string;
  array: any;
  setArray: any;
  distance: any;
  selectCardText: string;
  removeCardText: string;
  search: string;
  keywordId: string;
  insurance: string;
}
