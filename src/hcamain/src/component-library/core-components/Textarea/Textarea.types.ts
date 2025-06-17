export interface TextareaProps {
  id: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  maxCharacters?: number;
  helperText?: string;
  name?: string;
  defaultValue?: string;
  showOptionalText?: boolean;
}
