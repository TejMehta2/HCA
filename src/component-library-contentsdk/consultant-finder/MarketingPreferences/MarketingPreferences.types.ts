import { ReactNode } from 'react';

export interface MarketingPreferencesProps {
  children?: ReactNode | JSX.Element;
  headline: string;
  text: string | ReactNode | JSX.Element;
}
