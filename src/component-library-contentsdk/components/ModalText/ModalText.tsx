import React, { forwardRef, type JSX } from 'react';
import { ModalTextProps } from './ModalText.types';
import styles from './ModalText.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Modals from '../Modals/Modals';
import Button from '../../core-components/Button/Button';

const ModalText = (
  props: ModalTextProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const {
    theme = 'A-HCA-White',
    title1,
    copy1,
    title2,
    copy2,
    defaultOpen = false,
    cta1,
    cta2,
  } = props;
  return (
    <Themes theme={theme}>
      <Modals ref={ref} defaultOpen={defaultOpen}>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            <div className={styles.panel1}>
              <div className={styles.title}>{title1}</div>
              <div className={styles.copy}>{copy1}</div>
            </div>
            <div className={styles.panel2}>
              <div className={styles.title}>{title2}</div>
              <div className={styles.copy}>{copy2}</div>
            </div>
            <div className={styles.ctas}>
              {cta1 && (
                <div className={styles.cta1}>
                  <Button variation="full" size="large">
                    {cta1}
                  </Button>
                </div>
              )}
              {cta2 && (
                <div className={styles.cta2}>
                  <Button variation="full" size="large">
                    {cta2}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modals>
    </Themes>
  );
};

export default forwardRef(ModalText);
