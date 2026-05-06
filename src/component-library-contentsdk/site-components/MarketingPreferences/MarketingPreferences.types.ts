import { ReactNode, type JSX } from 'react';

export interface MarketingPreferencesProps {
  children?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  bodyCopy?: ReactNode | JSX.Element;
  preferences?: ReactNode | JSX.Element;
}
