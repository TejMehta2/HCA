import { ChangeEventHandler, type JSX } from 'react';

export interface SortingOptionProps {
  defaultChecked?: boolean;
  name?: string;
  value?: string;
  id: string;
  labelText: string;
}

export interface SortingProps {
  options: SortingOptionProps[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  anchorDropdown?: 'left' | 'right';
  defaultOpen?: boolean; // for test and mocking purposes
  buttonIcon?: JSX.Element;
  buttonText?: JSX.Element;
}
