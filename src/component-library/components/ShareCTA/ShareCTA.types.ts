import { ReactNode } from 'react';

export interface ShareCTAProps {
  shareData: {
    url: string;
    title: string;
    text: string;
  };
  children: ReactNode | JSX.Element;
}
