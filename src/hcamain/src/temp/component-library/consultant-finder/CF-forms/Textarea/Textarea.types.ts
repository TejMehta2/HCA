/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TextareaProps {
  id: string;
  name?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  maxCharacters?: number;
  helperText?: string;
  isError?: boolean;
  register: any;
}
