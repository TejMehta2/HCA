import { ReactNode, type JSX } from 'react';

export interface ShareCTAProps {
  shareData: {
    url: string;
    title: string;
    text: string;
  };
  shareCtaText: ReactNode | JSX.Element;
  shareCtaIcon?: ReactNode | JSX.Element;
  heading: ReactNode | JSX.Element;
  subheading?: ReactNode | JSX.Element;
  children: ReactNode | JSX.Element;
}
