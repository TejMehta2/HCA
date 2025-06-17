import { ChangeEventHandler } from 'react';

export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
  checked?: boolean;
}
