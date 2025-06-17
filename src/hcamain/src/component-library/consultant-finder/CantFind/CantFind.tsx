import React from 'react';
import { CantFindProps } from './CantFind.types';
import styles from './CantFind.module.scss';

const CantFind = (props: CantFindProps): JSX.Element => {
  const { children, contentVariation } = props;
  return (
    <div
      className={[
        styles['cant-find'],
        contentVariation === 'the-birth-company' && styles['the-birth-company'],
      ].join(' ')}
    >
      <div className={styles.title}>{props.title}</div>
      {children}
    </div>
  );
};

export default CantFind;
