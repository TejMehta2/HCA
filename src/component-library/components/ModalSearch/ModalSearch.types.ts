import { Theme } from '../../foundation/Themes/Themes.types';

export interface ModalSearchProps {
  suggestions?: JSX.Element;
  searchBar: JSX.Element;
  defaultOpen?: boolean;
  theme?: Theme;
}
