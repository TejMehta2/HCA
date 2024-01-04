import React from 'react';
import { CardGridProps } from './CardGrid.types';
import styles from './CardGrid.module.scss';
import Themes from '../../foundation/Themes/Themes';

const CardGrid = (props: CardGridProps): JSX.Element => {
  const { children, theme } = props;
  return (
    <Themes theme={theme}>
      <div
        className={`${styles.wrapper} ${
          children?.length == 2 ? styles.half : ''
        }`}
      >
        {children}
      </div>
    </Themes>
  );
};

export default CardGrid;
