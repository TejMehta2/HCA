import { ReactNode } from 'react';

export interface ShareCTAProps {
  shareData: {
    url: string;
    title: string;
    text: string;
  };
  heading: ReactNode | JSX.Element;
  subheading: ReactNode | JSX.Element;
}
