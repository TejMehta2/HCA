import React from 'react';
import { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.scss';

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { searchValue, handleInputChange, placeholder } = props;

  return (
    <div className={styles['search-wrapper']}>
      <input
        className={styles.search}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={placeholder || undefined}
      />
    </div>
  );
};

export default SearchBar;
