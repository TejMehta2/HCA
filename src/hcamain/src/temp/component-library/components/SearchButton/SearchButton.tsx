import React from 'react';
import { SearchButtonProps } from './SearchButton.types';
import styles from './SearchButton.module.scss';
import Icons from '../../foundation/Icons/Icons';

const SearchButton = (props: SearchButtonProps): JSX.Element => {
  const { children, onClick } = props;
  return (
    <>
      <button onClick={onClick} className={styles.button} type="button">
        <Icons iconName="iconSearch"></Icons>
        {children}
      </button>
    </>
  );
};

export default SearchButton;
