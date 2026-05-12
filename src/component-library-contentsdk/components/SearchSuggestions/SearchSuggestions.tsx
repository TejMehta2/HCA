'use client';

import React, { type JSX } from 'react';
import { SearchSuggestionsProps } from './SearchSuggestions.types';
import styles from './SearchSuggestions.module.scss';
import Icons from '../../foundation/Icons/Icons';
import { capitalizeFirstLetter } from '../../utility-functions';

const SearchSuggestions = (props: SearchSuggestionsProps): JSX.Element => {
  const {
    suggestions,
    currentValue,
    setValue,
    showError = false,
    error,
  } = props;
  if (!suggestions?.length || suggestions.includes(currentValue)) return <></>;
  return (
    <ul
      className={styles.suggestions}
      role={'listbox'}
      aria-label="suggestions"
    >
      {showError && error && error?.length > 0 && (
        <li className={styles['error-suggestion']}>
          <Icons iconName={'iconWarning'} />
          {error}
        </li>
      )}
      {suggestions.map((suggestion, index) => (
        <li key={`${suggestion}${index}`}>
          <button
            className={styles.suggestion}
            role={'option'}
            onMouseDown={() => {
              // onMouseDown instead of onClick, because it fires in MacOS and IOS more consistently
              setValue(suggestion);
            }}
            type={'button'}
            aria-selected={currentValue === suggestion}
          >
            <Icons iconName={'iconSearch'} />
            <span>{capitalizeFirstLetter(suggestion)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
