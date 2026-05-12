'use client';

import React, { useRef, type JSX } from 'react';
import { SearchFormPaginationProps } from './SearchFormPagination.types';
import Pagination from '../../core-components/Pagination/Pagination';

const SearchFormPagination = (
  props: SearchFormPaginationProps
): JSX.Element => {
  const { offset, limit, resultsCount, scrollToRef } = props;
  const offsetRef = useRef<HTMLInputElement>(null);
  const pageCount = Math.ceil(resultsCount / limit);
  const currentPage = offset / limit + 1;

  if (resultsCount === 0 || pageCount <= 1) return <></>;
  return (
    <>
      <input
        type={'number'}
        className="sr-only"
        name="offset"
        defaultValue={offset}
        ref={offsetRef}
        max={resultsCount}
        min={0}
        aria-hidden="true"
      />
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        callback={(newPage) => {
          const newOffset = (newPage - 1) * limit;
          // Convert state-based pagination callback to native HTML input change event
          const offsetField = offsetRef.current as HTMLInputElement;
          if (!offsetField) return;
          const prevValue = offsetField.value;
          offsetField.stepUp(newOffset - Number(offsetField.value)); // Step up allows us to dispatch event
          const newValue = offsetField.value;
          if (prevValue !== newValue) {
            const event = new Event('change', { bubbles: true });
            offsetField.dispatchEvent(event);
            scrollToRef?.current?.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }}
      />
    </>
  );
};

export default SearchFormPagination;
