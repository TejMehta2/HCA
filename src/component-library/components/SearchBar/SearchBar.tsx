import React, { useId, useRef } from 'react';
import { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.scss';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import Icons from '../../foundation/Icons/Icons';

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const {
    searchValue,
    handleInputChange,
    placeholder,
    name,
    defaultValue = '',
    suggestions = [],
    locationCta,
    children,
  } = props;
  const inputId = useId();
  const suggestionsId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const comboboxAttributes = {
    list: suggestionsId,
    role: 'combobox',
    'aria-controls': suggestionsId,
    'aria-expanded': suggestions.length,
  };
  const suggestionAttributes = suggestions.length ? comboboxAttributes : {};

  const controlAttributes =
    searchValue && handleInputChange
      ? {
          value: searchValue,
          onChange: handleInputChange,
        }
      : { defaultValue };

  const setValue = (newValue: string = '') => {
    if (!inputRef.current) return;
    // Use native setter to allow for dispatch propagation (native form change event)
    inputRef.current.value = newValue;
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles['search-bar']}>
        <Icons iconName={'iconSearch'} />
        <input
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              const target = event.target as HTMLInputElement;
              target.blur();
            }
          }}
          id={inputId}
          ref={inputRef}
          className={styles.input}
          type="text"
          name={name}
          placeholder={placeholder}
          {...suggestionAttributes}
          {...controlAttributes}
          autoComplete={'off'}
        />
        {locationCta}

        <div className={styles.suggestions}>
          <SearchSuggestions
            currentValue={defaultValue}
            suggestions={suggestions}
            setValue={setValue}
          />
        </div>
        {defaultValue && (
          <button
            className={styles.clear}
            type="submit"
            onClick={() => {
              setValue('');
            }}
          >
            <Icons iconName={'iconCross'} />
            <span className={'sr-only'}>Clear search</span>
          </button>
        )}
      </label>

      {children}
    </div>
  );
};

export default SearchBar;
