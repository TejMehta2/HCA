import React from 'react';
import { CardGridProps } from './CardGrid.types';
import styles from './CardGrid.module.scss';

const CardGrid = (props: CardGridProps): JSX.Element => {
  const { children } = props;
  console.log(children?.length);
  return (
    <div
      className={`${styles.wrapper} ${children?.length == 2 && styles.half}`}
    >
      {children}
    </div>
  );
};

export default CardGrid;
