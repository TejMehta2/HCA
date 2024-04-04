import { ChangeEventHandler } from 'react';

import { NumberRangeValue } from '@yext/search-headless-react';

export interface CheckboxProps {
  label: string | JSX.Element;
  name: string;
  id: string | number | boolean | NumberRangeValue;
  value: string | number | boolean | NumberRangeValue;
  mode?: 'light' | 'dark' | 'medium';
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler;
  checked?: boolean;
}
