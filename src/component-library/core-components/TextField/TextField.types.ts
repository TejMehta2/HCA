export interface TextFieldProps {
  id: string;
  type?: 'text' | 'email' | 'date';
  label?: string;
  helpText?: string;
  required?: boolean;
  errorMessage?: string;
  name?: string;
}
