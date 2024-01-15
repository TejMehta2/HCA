import React, { forwardRef } from 'react';
import { ModalDropdownProps } from './ModalDropdown.types';
import styles from './ModalDropdown.module.scss';

const ModalDropdown = (
  props: ModalDropdownProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const { children, defaultOpen = false } = props;
  return (
    <dialog
      data-testid="dialog"
      ref={ref}
      open={defaultOpen}
      className={styles.wrapper}
    >
      <div className={styles.content}>{children}</div>
    </dialog>
  );
};

export default forwardRef(ModalDropdown);
