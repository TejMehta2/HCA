import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface Tab {
  label?: string;
  value?: string;
  name?: string;
  icon?: IconName | JSX.Element;
  ariaControls?: 'string'; // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
}

export interface TabsProps {
  tabs: Tab[];
  callback: (args: {
    label: string;
    value: string;
    name: string;
    index: number;
  }) => void;
}

export type Dimensions = {
  offsetWidth: number;
  offsetLeft: number;
};
