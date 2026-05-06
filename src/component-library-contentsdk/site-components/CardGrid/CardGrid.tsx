import React from 'react';
import { CardGridProps } from './CardGrid.types';
import styles from './CardGrid.module.scss';

const CardGrid = (props: CardGridProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
};

export default CardGrid;
