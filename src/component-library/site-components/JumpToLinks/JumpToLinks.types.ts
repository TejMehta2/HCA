import { ReactNode } from 'react';

export interface JumpToLinkProps {
  children?: ReactNode | JSX.Element;
}

export interface JumpToLinksProps {
  heading: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  variation: string;
  isSticky?: boolean;
}
