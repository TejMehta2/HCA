export interface SearchSuggestionsProps {
  suggestions: string[];
  currentValue: string;
  setValue: (newValue: string) => void;
}
