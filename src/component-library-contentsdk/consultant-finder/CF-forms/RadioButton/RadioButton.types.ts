/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler } from 'react';

export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  mode?: 'light' | 'dark' | 'medium';
  disabled?: boolean;
  onChange?: ChangeEventHandler;
  checked?: boolean;
  register: any;
  key: any;
}
