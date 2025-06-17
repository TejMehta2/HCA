import React from 'react';
import { GridsProps } from './Grids.demo.types';
import styles from './Grids.demo.module.scss';
import Text from '../Text/Text';
const Grids = (props: GridsProps) => {
  const {} = props;
  return (
    <div className={styles.grid}>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <Text>no class</Text>
      <div className={styles.half}>
        <Text>.half</Text>
      </div>
      <div className={styles.half}>
        <Text>.half</Text>
      </div>
      <div className={styles.third}>
        <Text>.third</Text>
      </div>
      <div className={styles.floating}>
        <Text>.floating</Text>
      </div>
      <div className={styles.default}>
        <Text>.default</Text>
      </div>
    </div>
  );
};

export default Grids;
