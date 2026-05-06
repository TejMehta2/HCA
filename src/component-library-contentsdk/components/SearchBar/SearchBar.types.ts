import { ChangeEventHandler, ReactNode, type JSX } from 'react';

export interface SearchBarProps {
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  handleInputChange?: ChangeEventHandler<HTMLInputElement>;
  searchValue?: string;
  suggestions?: string[];
  locationCta?: JSX.Element;
  children?: JSX.Element | ReactNode;
  searchOnEnter?: boolean;
  error?: string;
  scrollRef?: React.RefObject<HTMLElement>;
  preventSubmitOnSuggestion?: boolean;
  showIcon?: boolean;
}
