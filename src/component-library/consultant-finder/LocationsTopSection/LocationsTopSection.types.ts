/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface LocationsTopSectionProps {
  children?: ReactNode | JSX.Element;
  array: any;
  setArray: any;
  slugs: any;
  locationAPI: string;
  postcodesFacilities: string;
}
