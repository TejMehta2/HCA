import { ReactNode } from 'react';

export interface YextResultCardLocationsProps {
  number: JSX.Element;
  image: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element;
  distance: JSX.Element;
  ctas?: {
    button?: ReactNode | JSX.Element;
    textButton?: ReactNode | JSX.Element;
  };
  address: {
    icon: JSX.Element;
    text: JSX.Element;
  };
  phone?: {
    icon: JSX.Element;
    text: JSX.Element;
  };
  openingHours?: {
    icon: JSX.Element;
    text: JSX.Element;
  };
  variation?: 'side-by-side' | 'stacked';
}
