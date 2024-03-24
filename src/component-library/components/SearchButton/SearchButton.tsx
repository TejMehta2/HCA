import React, { useRef } from 'react';
import { SearchButtonProps } from './SearchButton.types';
import styles from './SearchButton.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Modals from '../Modals/Modals';

const SearchButton = (props: SearchButtonProps): JSX.Element => {
  const { children, modalContent } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        onClick={() => dialogRef?.current?.showModal()}
        className={styles.button}
        type="button"
      >
        <Icons iconName="iconSearch"></Icons>
        {children}
      </button>
      <Modals ref={dialogRef}>{modalContent}</Modals>
    </>
  );
};

export default SearchButton;
