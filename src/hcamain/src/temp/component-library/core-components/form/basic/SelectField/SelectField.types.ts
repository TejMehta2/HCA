export interface Option {
  text: string;
  value?: string;
}

export interface SelectFieldProps {
  id: string;
  label?: string;
  helpText?: string;
  placeholder?: string;
  error?: string;
  name: string;
  options: Option[];
  onChange?: (option: Option) => void;
  defaultValue?: Option;
}
