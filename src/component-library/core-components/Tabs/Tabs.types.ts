import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface Tab {
  label: string;
  icon?: IconName;
  ariaControls?: 'string'; // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
}

export interface TabsProps {
  tabs: Tab[];
  callback: (label: string) => void;
}

export type Dimensions = {
  offsetWidth: number;
  offsetLeft: number;
};
