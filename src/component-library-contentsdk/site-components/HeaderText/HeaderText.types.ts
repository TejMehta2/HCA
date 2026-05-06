import { type JSX } from 'react';
export interface HeaderTextProps {
  subtitle?: JSX.Element;
  title?: JSX.Element;
  error?: JSX.Element;
  description?: JSX.Element;
  cta?: JSX.Element;
  fullHeight?: boolean;
}
