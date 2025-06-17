/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SelectFieldProps {
  id: string;
  label?: string;
  name?: string;
  helpText?: string;
  placeholder?: string;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
  options: object[];
  register: any;
  addDefaultValue?: boolean;
  defaultValueLabel?: string;
  defaultValue?: string;
}
