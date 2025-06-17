import React, { useCallback } from 'react';
import styles from './YextCustomPagination.module.scss';
import { YextCustomPaginationProps } from './YextCustomPagination.types';
import Pagination from '../../core-components/Pagination/Pagination';
import { useSearchActions, useSearchState } from '@yext/search-headless-react';
import { executeSearch } from '@yext/search-ui-react';

const YextCustomPagination = (
  props: YextCustomPaginationProps
): JSX.Element => {
  const { paginateAllOnNoResults, callback } = props;
  const searchActions = useSearchActions();
  const verticalResultsCount =
    useSearchState((state) => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical =
    useSearchState(
      (state) => state.vertical?.noResults?.allResultsForVertical.resultsCount
    ) || 0;
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  let resultsCount = verticalResultsCount;
  if (verticalResultsCount === 0 && paginateAllOnNoResults) {
    resultsCount = allResultsCountForVertical;
  }

  const offset = useSearchState((state) => state.vertical.offset) || 0;
  const limit = useSearchState((state) => state.vertical.limit) || 20;
  const currentPageNumber = offset / limit + 1;
  const maxPageCount = Math.ceil(resultsCount / limit);

  const navigateToPage = useCallback(
    (newPageNumber: number) => {
      if (isLoading) return;
      const newOffset = limit * (newPageNumber - 1);
      searchActions.setOffset(newOffset);
      executeSearch(searchActions);
      callback?.();
    },
    [searchActions, limit, isLoading, callback]
  );

  if (maxPageCount <= 1) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <Pagination
        pageCount={maxPageCount}
        currentPage={currentPageNumber}
        callback={navigateToPage}
      />
    </div>
  );
};

export default YextCustomPagination;
