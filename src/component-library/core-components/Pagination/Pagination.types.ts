import { Theme } from '../../foundation/Themes/Themes.types';

export interface PaginationProps {
  theme: Theme;
  pageCount: number;
  currentPage?: number;
  callback: (page: number) => void;
}
