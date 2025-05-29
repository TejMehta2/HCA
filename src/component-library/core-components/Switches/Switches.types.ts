export interface SwitchesProps {
  label: string;
  mode?:
    | 'light'
    | 'dark'
    | 'medium'
    | 'palace-light'
    | 'palace-dark'
    | 'chelsea-light'
    | 'chelsea-dark';
  disabled?: boolean;
}
