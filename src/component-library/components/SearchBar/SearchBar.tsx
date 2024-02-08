import React, { useEffect, useState } from 'react';
import { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.scss';

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { handleInputChange, placeholder } = props;

  const [value, setValue] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
    handleInputChange;
  };

  useEffect(() => {
    if (value && value.length > 0) {
      setShowPlaceholder(false);
    }
  }, [value, showPlaceholder]);

  return (
    <label className={styles['search-wrapper']}>
      {showPlaceholder && (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
      <input
        className={styles.search}
        type="text"
        value={value}
        onChange={handleSearch}
      />
    </label>
  );
};

export default SearchBar;
