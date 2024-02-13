import React from 'react';
import styles from './Navigation.module.scss';
import NavigationProps from './Navigation.types';

const Search = (props: NavigationProps): JSX.Element => {
  return (
    <div className={styles['consultant-finder-navigation']}>
      {props.children}
    </div>
  );
};

export default Search;
