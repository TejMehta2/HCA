import { Theme } from '../../foundation/Themes/Themes.types';

export interface PaginationProps {
  theme: Theme;
  itemsPerPage: number;
  currentPage: number;
  data: JSX.Element[];
}
