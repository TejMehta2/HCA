import { Theme } from '../../foundation/Themes/Themes.types';

export interface PaginationGridProps {
  theme: Theme;
  data: JSX.Element[];
  pageCount: number;
  getPageContent: (page: number) => JSX.Element[];
}
