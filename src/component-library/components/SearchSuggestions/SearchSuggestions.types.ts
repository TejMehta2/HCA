export interface SearchSuggestionsProps {
  suggestions: string[];
  currentValue: string;
  setValue: (newValue: string) => void;
  submitOnSelection?: boolean;
  showError?: boolean;
  error?: string;
}
