import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  label: string | JSX.Element;
  name: string;
  id: string;
  value: string | number;
  mode?: 'light' | 'dark' | 'medium';
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler;
  checked?: boolean;
}
