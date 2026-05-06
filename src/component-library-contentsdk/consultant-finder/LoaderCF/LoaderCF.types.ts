import { ReactNode, type JSX } from 'react';

export interface LoaderCFProps {
  children?: ReactNode | JSX.Element;
  loadingMsg?: string;
}
