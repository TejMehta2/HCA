import { ChangeEventHandler } from 'react';

export interface SearchBarProps {
  handleInputChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  searchValue?: string;
}
