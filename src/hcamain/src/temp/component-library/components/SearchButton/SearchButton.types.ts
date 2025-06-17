import { MouseEventHandler, ReactNode } from 'react';

export interface SearchButtonProps {
  children?: ReactNode | JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
