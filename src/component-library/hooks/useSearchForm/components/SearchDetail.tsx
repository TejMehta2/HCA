import { useI18n } from 'next-localization';
import React from 'react';

// Shows the number of results
// Interpolates the search input and number of results into two provided strings
// user will set the two strings in CMS with an interpolation as shown in the default props

interface SearchDetailProps {
  searchResultsTextWithInput?: string;
  searchResultsText?: string;
  resultsCount: number;
  input?: string;
}

const SearchDetail = (props: SearchDetailProps) => {
  const {
    searchResultsText = '{{quantity}} results',
    searchResultsTextWithInput = '{{quantity}} results including {{input}}',
    resultsCount,
    input,
  } = props;
  const { t, set } = useI18n();

  set('en', {
    ['search-results-text-with-input']: searchResultsTextWithInput,
    ['search-results-text']: searchResultsText,
  });
  const params = {
    quantity: resultsCount,
    input: input,
  };

  const key = params.input
    ? 'search-results-text-with-input'
    : 'search-results-text';
  return <>{t(key, params)}</>;
};

export default SearchDetail;
