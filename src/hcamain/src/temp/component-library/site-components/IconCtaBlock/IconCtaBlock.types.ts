import { ReactNode } from 'react';

export interface IconCtaBlockChildProps {
  iconMobile?: JSX.Element;
  iconDesktop?: JSX.Element;
  icon?: JSX.Element;
  title?: JSX.Element;
  copy?: JSX.Element;
  ctas?: JSX.Element;
}

export interface IconCtaBlockProps {
  children?: ReactNode | JSX.Element;
}
