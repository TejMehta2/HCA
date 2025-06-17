import { IconName } from '../../foundation/Icons/icon-map.generated';

export interface Tab {
  label?: string;
  value?: string;
  name?: string;
  icon?: IconName | JSX.Element;
  ariaControls?: 'string'; // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
}

export interface Args {
  label: string;
  value: string;
  name: string;
  index: number;
}

export interface TabsProps {
  tabs: Tab[];
  callback: (args: Args) => void;
  contentVariation?: 'scroll-max-large';
  overrideTabIndex?: number;
}

export type Dimensions = {
  offsetWidth: number;
  offsetLeft: number;
};
