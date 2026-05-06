import React, { type JSX } from 'react';
import { StyledYextSearchBarProps } from './StyledYextSearchBar.types';
import styles from './StyledYextSearchBar.module.scss';
import { SearchBar } from '@yext/search-ui-react';

const StyledYextSearchBar = (props: StyledYextSearchBarProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <SearchBar
        hideRecentSearches
        customCssClasses={{
          // autocomplete
          option: styles.option,
          icon: styles.icon,
          highlighted: styles.highlighted,
          nonHighlighted: styles['non-highlighted'],
          // search bar
          searchBarContainer: styles['search-bar-container'],
          inputElement: styles['input-element'],
          inputDivider: styles['input-divider'],
          clearButton: styles['clear-button'],
          searchButton: styles['search-button'],
          searchButtonContainer: styles['search-button-container'],
          focusedOption: styles['focused-option'],
          recentSearchesIcon: styles['recent-searches-icon'],
          recentSearchesOption: styles['recent-searches-option'],
          recentSearchesNonHighlighted:
            styles['recent-searches-non-highlighted'],
          verticalLink: styles['vertical-link'],
          verticalDivider: styles['vertical-divider'],
          entityPreviewsDivider: styles['entity-previews-divider'],
        }}
        {...props}
      />
    </div>
  );
};

export default StyledYextSearchBar;
