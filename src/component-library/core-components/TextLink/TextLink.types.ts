import { ReactNode } from 'react';

export interface TextLinkProps {
  children: ReactNode | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
