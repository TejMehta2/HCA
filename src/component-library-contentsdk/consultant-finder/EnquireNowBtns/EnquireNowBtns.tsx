import React, { type JSX } from 'react';
import { EnquireNowBtnsProps } from './EnquireNowBtns.types';
import styles from './EnquireNowBtns.module.scss';

const EnquireNowBtns = (props: EnquireNowBtnsProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['enquire-btns']}>{children}</div>;
};

export default EnquireNowBtns;
