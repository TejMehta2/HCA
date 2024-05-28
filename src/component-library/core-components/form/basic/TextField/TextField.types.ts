export interface TextFieldProps {
  type?: 'text' | 'email';
  label?: string;
  helpText?: string;
  error?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
}
