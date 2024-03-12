import React from 'react';
import { DataComponentSimpleProps } from './DataComponentSimple.types';
import styles from './DataComponentSimple.module.scss';
import Text from '../../foundation/Text/Text';

const DataComponentSimple = (props: DataComponentSimpleProps): JSX.Element => {
  return (
    <div className={styles.data}>
      <div className={styles.title}>
        <Text tag="h3" variation="subheading-1">
          {props.title}
        </Text>
      </div>
      <div className={styles.items}>
        <Text tag="p" variation="body-large">
          {props.data}
        </Text>
      </div>
    </div>
  );
};

export default DataComponentSimple;
