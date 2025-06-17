import React from 'react';
import { CmaDisclosureProps } from './CmaDisclosure.types';
import styles from './CmaDisclosure.module.scss';

const CmaDisclosure = (props: CmaDisclosureProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['cma-disclosure']}>{children}</div>;
};

export default CmaDisclosure;
