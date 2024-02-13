import React from 'react';
import { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.scss';

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { searchValue, handleInputChange, placeholder, name, defaultValue } =
    props;

  if (searchValue && handleInputChange) {
    return (
      <div className={styles['search-wrapper']}>
        <input
          className={styles.search}
          type="search"
          name={name}
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
    );
  }
  return (
    <div className={styles['search-wrapper']}>
      <input
        className={styles.search}
        type="search"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
