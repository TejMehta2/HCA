import { ReactNode, type JSX } from 'react';

export interface JumpToLinkProps {
  children?: ReactNode | JSX.Element;
}

export interface JumpToLinksProps {
  heading: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  variation?: string;
  isSticky?: boolean;
  mobileHeading?: string;
  hasMultipleColumns?: boolean;
}
