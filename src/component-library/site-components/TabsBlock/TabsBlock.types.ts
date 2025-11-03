import { Tab } from '../../core-components/Tabs/Tabs.types';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface TabsContent {
  tab: Tab;
  image: JSX.Element;
  title: JSX.Element;
  bodyCopy: JSX.Element;
}

export interface TabsBlockProps {
  theme?: Theme;
  title?: JSX.Element;
  tabsContent?: TabsContent[];
  id?: string;
  tableOfContentTitle?: string;
}
