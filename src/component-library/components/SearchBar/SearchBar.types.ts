import { ChangeEventHandler, ReactNode } from 'react';

export interface SearchBarProps {
  handleInputChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string | ReactNode | JSX.Element;
  searchValue?: string;
}
