import { ReactNode, type JSX } from 'react';

export interface CardRoleProps {
  image?: ReactNode | JSX.Element;
  icon?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}
