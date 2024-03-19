export interface SearchFormPaginationProps {
  offset: number;
  limit: number;
  resultsCount: number;
  scrollToRef?: React.RefObject<HTMLElement>;
}
