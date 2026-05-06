import React, { useId, useRef, useState, type JSX } from 'react';
import { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.scss';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import Icons from '../../foundation/Icons/Icons';
import { scrollToRef } from '../../utility-functions';

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
    searchOnEnter = false,
    error = '',
    scrollRef,
    preventSubmitOnSuggestion = false,
    showIcon = true,
  } = props;
  const inputId = useId();
  const suggestionsId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [showError, setShowError] = useState(false);

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
    setShowError(false);

    if (newValue !== '' && typeof window !== 'undefined') {
      if (scrollRef) {
        scrollToRef(scrollRef);
      }
    }

    if (!inputRef.current) return;
    inputRef.current.value = newValue;

    if (!submitRef.current) return;
    if (!preventSubmitOnSuggestion) {
      submitRef.current.click();
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        ref={submitRef}
        aria-hidden={true}
        className={'sr-only'}
        type={'submit'}
        tabIndex={-1}
      >
        Submit
      </button>
      <label htmlFor={inputId} className={styles['search-bar']}>
        {showIcon && (
          <div className={styles['search-icon']}>
            <Icons iconName={'iconSearch'} />
          </div>
        )}
        <input
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !searchOnEnter) {
              event.preventDefault(); // avoid auto selecting suggestions
              const target = event.target as HTMLInputElement;

              if (error && error.length > 0) {
                setShowError(true);
              } else {
                target.blur();
              }
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
            showError={showError}
            error={error}
          />
        </div>
        {defaultValue && (
          <button
            className={styles.clear}
            type="button"
            onMouseDown={() => {
              // onMouseDown instead of onClick, because it fires in MacOS and IOS more consistently
              setValue('');
              setShowError(false);
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
