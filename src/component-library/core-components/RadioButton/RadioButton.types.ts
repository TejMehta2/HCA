export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  mode?: 'light' | 'dark' | 'medium';
  disabled?: boolean;
}
