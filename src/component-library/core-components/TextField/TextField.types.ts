export interface TextFieldProps {
  id: string;
  type?: 'text' | 'email';
  label?: string;
  tooltip?: JSX.Element;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}
