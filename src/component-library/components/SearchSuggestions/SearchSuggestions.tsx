import React from 'react';
import { SearchSuggestionsProps } from './SearchSuggestions.types';
import styles from './SearchSuggestions.module.scss';
import Icons from '../../foundation/Icons/Icons';
import { capitalizeFirstLetter } from '../../utility-functions';

const SearchSuggestions = (props: SearchSuggestionsProps): JSX.Element => {
  const { suggestions, currentValue, setValue, submitOnSelection } = props;
  if (!suggestions?.length) return <></>;
  return (
    <ul
      className={styles.suggestions}
      role={'listbox'}
      aria-label="suggestions"
    >
      {suggestions.map((suggestion, index) => (
        <li key={index}>
          <button
            className={styles.suggestion}
            role={'option'}
            onClick={() => setValue(suggestion)}
            type={submitOnSelection ? 'submit' : 'button'}
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
