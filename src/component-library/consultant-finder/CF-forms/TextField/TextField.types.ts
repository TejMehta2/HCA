/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TextFieldProps {
  id: string;
  type?: 'text' | 'email';
  label?: string;
  name?: string;
  helpText?: string;
  required?: boolean;
  errorMessage?: string;
  isError?: boolean;
  register: any;
  setValue: any;
}
