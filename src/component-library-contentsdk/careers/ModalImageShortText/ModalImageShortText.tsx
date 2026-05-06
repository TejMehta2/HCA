import React, { forwardRef, MutableRefObject, type JSX } from 'react';
import { ModalImageShortTextProps } from './ModalImageShortText.types';
import Themes from '../../foundation/Themes/Themes';
import Modals from '../../components/Modals/Modals';
import styles from './ModalImageShortText.module.scss';

const ModalImageShortText = (
  props: ModalImageShortTextProps,
  ref: MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const { defaultOpen = false, header, image, subheader, copy } = props;
  return (
    <Themes theme="A-HCA-White">
      <Modals ref={ref} defaultOpen={defaultOpen}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.image}>{image}</div>
            <div className={styles.text}>
              <div className={styles.subheader}>{subheader}</div>
              <div className={styles.header}>{header}</div>
              <div className={styles.copy}>{copy}</div>
            </div>
          </div>
        </div>
      </Modals>
    </Themes>
  );
};

export default forwardRef(ModalImageShortText);
