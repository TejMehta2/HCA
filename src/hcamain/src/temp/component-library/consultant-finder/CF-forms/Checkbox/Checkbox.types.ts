/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  label: string | JSX.Element;
  name: string;
  id: string;
  value?: string | number | boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler;
  checked?: boolean;
  register: any;
  setValue?: any;
}
