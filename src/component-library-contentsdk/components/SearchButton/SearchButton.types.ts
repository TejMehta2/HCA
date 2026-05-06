import { MouseEventHandler, ReactNode, type JSX } from 'react';

export interface SearchButtonProps {
  children?: ReactNode | JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
