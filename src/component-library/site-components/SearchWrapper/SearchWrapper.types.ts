import { ReactNode } from 'react';
import { Theme } from '../../foundation/Themes/Themes.types';
import { Tab } from '../../core-components/Tabs/Tabs.types';

export interface ResultTab {
  tab: Tab;
  tabContent: ReactNode | JSX.Element;
}

export interface SearchWrapperProps {
  header?: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  searchDetail?: ReactNode | JSX.Element;
  showing?: ReactNode | JSX.Element;
  theme?: Theme;
  tabbedResults?: ResultTab[];
}
