import React, { type JSX } from 'react';
import { RedirectOverlayProps } from './RedirectOverlay.types';
import styles from './RedirectOverlay.module.scss';

const RedirectOverlay = (props: RedirectOverlayProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.overlay}>{children}</div>;
};

export default RedirectOverlay;
