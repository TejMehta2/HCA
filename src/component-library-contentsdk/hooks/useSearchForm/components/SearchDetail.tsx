'use client';
import { createTranslator, useLocale } from 'next-intl';
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

const toIcuMessage = (message: string) =>
  message.replace(/{{\s*([\w-]+)\s*}}/g, '{$1}');

const SearchDetail = (props: SearchDetailProps) => {
  const {
    searchResultsText = '{{quantity}} results',
    searchResultsTextWithInput = '{{quantity}} results including {{input}}',
    resultsCount,
    input,
  } = props;

  const locale = useLocale();
  const t = createTranslator({
    locale,
    messages: {
      'search-results-text-with-input': toIcuMessage(
        searchResultsTextWithInput
      ),
      'search-results-text': toIcuMessage(searchResultsText),
    },
  });

  const key = input ? 'search-results-text-with-input' : 'search-results-text';

  return (
    <>
      {t(key, {
        quantity: resultsCount,
        ...(input ? { input } : {}),
      })}
    </>
  );
};

export default SearchDetail;
