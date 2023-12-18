import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  label: string;
  name: string;
  value: string | number;
  mode?: 'light' | 'dark' | 'medium';
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: ChangeEventHandler;
  checked?: boolean;
}
