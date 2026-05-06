export interface TextFieldProps {
  type?: 'text' | 'email' | 'date';
  label?: string;
  helpText?: string;
  error?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
}
