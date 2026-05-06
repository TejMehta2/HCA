import React, { useRef, type JSX } from 'react';
import { SearchFormLoadMoreProps } from './SearchFormLoadMore.types';
import Button from '../../core-components/Button/Button';
const SearchFormLoadMore = (props: SearchFormLoadMoreProps): JSX.Element => {
  const { limit, resultsCount, defaultLimit, children } = props;
  const limitRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input
        type={'number'}
        className="sr-only"
        name="limit"
        value={limit}
        onChange={() => {}}
        ref={limitRef}
        aria-hidden="true"
      />
      <Button size={'large'} variation={'full'}>
        <button
          disabled={resultsCount < 0 || limit >= resultsCount}
          onClick={() => {
            const limitField = limitRef.current as HTMLInputElement;
            if (!limitField) return;
            limitField.stepUp(defaultLimit);
            const event = new Event('submit', { bubbles: true });
            limitField.dispatchEvent(event);
          }}
        >
          {children}
        </button>
      </Button>
    </div>
  );
};

export default SearchFormLoadMore;
