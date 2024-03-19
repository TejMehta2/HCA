import React from 'react';
import { SearchSuggestionsProps } from './SearchSuggestions.types';
import styles from './SearchSuggestions.module.scss';
import Icons from '../../foundation/Icons/Icons';
import { capitalizeFirstLetter } from '../../utility-functions';

const SearchSuggestions = (props: SearchSuggestionsProps): JSX.Element => {
  const { suggestions, currentValue, setValue } = props;
  if (!suggestions?.length) return <></>;
  return (
    <ul
      className={styles.suggestions}
      role={'listbox'}
      aria-label="suggestions"
    >
      {suggestions.map((suggestion, index) => (
        <li
          className={styles.suggestion}
          onClick={() => setValue(suggestion)}
          role={'option'}
          aria-selected={currentValue === suggestion}
          key={index}
        >
          <Icons iconName={'iconSearch'} />
          <span>{capitalizeFirstLetter(suggestion)}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
