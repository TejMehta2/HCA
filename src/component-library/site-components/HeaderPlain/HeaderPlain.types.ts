import { ReactNode } from 'react';

export interface HeaderPlainProps {
  children: ReactNode | JSX.Element;
  heading: ReactNode | JSX.Element;
  subheading?: ReactNode | JSX.Element;
}
