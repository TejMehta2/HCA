import React from 'react';
import { SearchSuggestionsProps } from './SearchSuggestions.types';
import styles from './SearchSuggestions.module.scss';
import Icons from '../../foundation/Icons/Icons';
import { capitalizeFirstLetter } from '../../utility-functions';

const SearchSuggestions = (props: SearchSuggestionsProps): JSX.Element => {
  const { suggestions, currentValue, setValue } = props;
  if (!suggestions?.length || suggestions.includes(currentValue)) return <></>;
  return (
    <ul
      className={styles.suggestions}
      role={'listbox'}
      aria-label="suggestions"
    >
      {suggestions.map((suggestion, index) => (
        <li key={`${suggestion}${index}`}>
          <button
            className={styles.suggestion}
            role={'option'}
            onClick={(event) => {
              const target = event.target as HTMLButtonElement;
              target.blur();
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
