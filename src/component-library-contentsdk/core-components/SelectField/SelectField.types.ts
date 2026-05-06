interface Options {
  text: string;
}

export interface SelectFieldProps {
  id: string;
  label?: string;
  helpText?: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  options: Options[];
}
