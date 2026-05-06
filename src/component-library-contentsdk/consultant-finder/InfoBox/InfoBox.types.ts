import { ReactNode, type JSX } from 'react';

export interface InfoBoxProps {
  icon?: ReactNode | JSX.Element;
  isShortInfo: boolean;
  shortText?: ReactNode | JSX.Element | string;
  longTextTitle?: string;
  longText?: ReactNode | JSX.Element | string;
  paddingLarge?: boolean;
  backgroundColour: 'green' | 'orange' | 'turquoise' | 'beige';
}
