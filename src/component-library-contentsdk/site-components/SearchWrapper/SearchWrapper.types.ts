import { ReactNode, type JSX } from 'react';
import { Tab } from '../../core-components/Tabs/Tabs.types';

export interface ResultTab {
  tab: Tab;
  tabContent: ReactNode | JSX.Element;
}

export interface SearchWrapperProps {
  children?: ReactNode | JSX.Element;
  searchDetail?: ReactNode | JSX.Element;
  showing?: ReactNode | JSX.Element;
  tabbedResults?: ResultTab[];
}
