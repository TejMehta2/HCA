import React, { forwardRef } from 'react';
import { ModalTextProps } from './ModalText.types';
import styles from './ModalText.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Modals from '../Modals/Modals';

const ModalText = (
  props: ModalTextProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const { theme, title1, body1, title2, body2, defaultOpen = false } = props;
  return (
    <Themes theme={theme}>
      <Modals ref={ref} defaultOpen={defaultOpen}>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            <div className={styles.panel1}>
              {title1}
              {body1}
            </div>
            <div className={styles.panel2}>
              {title2}
              {body2}
            </div>
          </div>
        </div>
      </Modals>
    </Themes>
  );
};

export default forwardRef(ModalText);
