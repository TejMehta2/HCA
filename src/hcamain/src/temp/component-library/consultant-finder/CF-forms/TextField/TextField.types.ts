/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TextFieldProps {
  id: string;
  type?: 'text' | 'email' | 'date';
  label?: string;
  name?: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  errorMessage?: string;
  isError?: boolean;
  register: any;
  setValue: any;
}
