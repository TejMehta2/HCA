import { ChangeEventHandler } from 'react';

export interface SearchBarProps {
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  handleInputChange?: ChangeEventHandler<HTMLInputElement>;
  searchValue?: string;
}
