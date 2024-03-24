export interface SearchFilterListProps {
  filters: { id: string; label: string }[];
  clearFilters: () => void;
}
