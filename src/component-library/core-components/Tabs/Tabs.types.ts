import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface Tab {
  label: string;
  icon?: IconName;
  ariaControls?: 'string'; // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
}

export type TabTheme =
  | 'main-turquoise'
  | 'main-turquoise-20'
  | 'light-orange'
  | 'white';

export interface TabsProps {
  tabs: Tab[];
  theme?: TabTheme;
  callback: (label: string) => void;
}

export type Dimensions = {
  offsetWidth: number;
  offsetLeft: number;
};
