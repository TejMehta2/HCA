/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface SelectLocationProps {
  children?: ReactNode | JSX.Element;
  locations: any;
  noLocationsMsg: string;
}
