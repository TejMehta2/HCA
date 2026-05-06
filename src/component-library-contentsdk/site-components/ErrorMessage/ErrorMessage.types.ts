import { ReactNode, type JSX } from 'react';

export interface ErrorMessageProps {
  children?: ReactNode | JSX.Element;
  contentVariation?: 'no-container';
}
