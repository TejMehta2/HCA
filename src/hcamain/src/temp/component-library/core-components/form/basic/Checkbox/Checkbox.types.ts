import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  label: string | JSX.Element;
  name: string;
  id: string;
  value?: string | number;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  required?: boolean;
  errorMessage?: string;
}
