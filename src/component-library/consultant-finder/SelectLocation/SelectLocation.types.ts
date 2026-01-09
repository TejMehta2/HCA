/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface SelectLocationProps {
  children?: ReactNode | JSX.Element;
  locations: any;
  icon: ReactNode | JSX.Element;
  iconPhone: ReactNode | JSX.Element;
  noLocationsMsg: string;
  viewOnMapText?: string;
  nextLink: string;
}
