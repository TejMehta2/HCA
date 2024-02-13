export interface PaginationProps {
  pageCount: number;
  currentPage?: number;
  callback?: (page: number) => void;
}
