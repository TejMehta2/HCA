// hooks/useGlobalSearch.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchState, useSearchActions } from 'yext-search-core';

const useGlobalSearch = () => {
  const router = useRouter();
  const searchState = useSearchState((state) => state);
  const searchActions = useSearchActions();

  // Update query parameters based on search state
  useEffect(() => {
    const query = searchState.query.input;
    if (query) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, q: query },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [searchState.query.input]);

  // Function to update the search query
  const updateSearchQuery = (query) => {
    searchActions.setQuery(query);
    searchActions.executeSearch();
  };

  return {
    searchState,
    updateSearchQuery,
  };
};

export default useGlobalSearch;
