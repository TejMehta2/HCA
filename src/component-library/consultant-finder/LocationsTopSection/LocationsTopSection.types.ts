/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface LocationsTopSectionProps {
  children?: ReactNode | JSX.Element;
  array: any;
  setArray: any;
  slugs: any;
  locationAPI: string;
  postcodesFacilities: string;
  hospitals: any;
  setHospitals: any;
  subheadline: string;
  title: string;
  text: string | ReactNode | JSX.Element;
  searchPlaceholderText: string;
  removeAllLocationsButtonText: string;
  selectAllLocationsButtonText: string;
  setCalculate: any;
}
