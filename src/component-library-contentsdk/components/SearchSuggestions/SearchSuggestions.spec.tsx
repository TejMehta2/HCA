import React from 'react';
import { render } from '@testing-library/react';
import SearchSuggestions from './SearchSuggestions';
import { SearchSuggestionsProps } from './SearchSuggestions.types';

const mockProps: SearchSuggestionsProps = {
  suggestions: ['Suggestion A', 'Suggestion B'],
  currentValue: '',
  setValue: (newValue: string) => console.log(newValue),
};

describe('SearchSuggestions', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchSuggestions {...mockProps} />);
    expect(getByText('Suggestion A')).toBeVisible();
  });
});
