import { CheckboxProps } from '../Checkbox/Checkbox.types';

export interface NestedCheckboxesSubItemsProps {
  subItems: CheckboxProps[];
  mainCheckbox: CheckboxProps;
}

export interface NestedCheckboxesProps {
  items: NestedCheckboxesSubItemsProps[];
  compute: (id: string | number, newStatus: string) => void;
}
