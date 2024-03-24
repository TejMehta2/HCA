import React, { forwardRef } from 'react';
import { ModalSearchProps } from './ModalSearch.types';
import styles from './ModalSearch.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Modals from '../Modals/Modals';

const ModalSearch = (
  props: ModalSearchProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const {
    defaultOpen = false,
    searchBar,
    suggestions,
    theme = 'D-HCA-Teal',
  } = props;
  return (
    <Themes theme={theme}>
      <Modals ref={ref} defaultOpen={defaultOpen}>
        <div className={styles.wrapper}>
          {searchBar}
          {suggestions && (
            <div className={styles.suggestions}>{suggestions}</div>
          )}
        </div>
      </Modals>
    </Themes>
  );
};

export default forwardRef(ModalSearch);
