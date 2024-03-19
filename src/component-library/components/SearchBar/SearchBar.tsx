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

  const setValue = (newValue?: string) => {
    if (!inputRef.current) return;
    // Use native setter to allow for dispatch propagation (native form change event)
    const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(
      window?.HTMLInputElement.prototype,
      'value'
    )?.set;
    nativeInputValueSetter?.call(inputRef.current, newValue);
    const event = new Event('change', { bubbles: true });
    inputRef.current.dispatchEvent(event);
  };

  const hideSuggestions =
    defaultValue === '' || suggestions.includes(defaultValue); // defaultValue will change to match current value after user picks a suggestion

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles['search-bar']}>
        <Icons iconName={'iconSearch'} />
        <input
          id={inputId}
          ref={inputRef}
          className={styles.input}
          type="text"
          name={name}
          placeholder={placeholder}
          {...suggestionAttributes}
          {...controlAttributes}
        />
        {locationCta}
        {defaultValue && (
          <button
            className={styles.clear}
            type="button"
            onClick={() => {
              setValue('');
            }}
          >
            <Icons iconName={'iconCross'} />
            <span className={'sr-only'}>Clear search</span>
          </button>
        )}
        {!hideSuggestions && (
          <div className={styles.suggestions}>
            <SearchSuggestions
              currentValue={defaultValue}
              suggestions={suggestions}
              setValue={setValue}
            />
          </div>
        )}
      </label>

      {children}
    </div>
  );
};

export default SearchBar;
