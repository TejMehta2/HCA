import React from 'react';
import { DiamondLineProps } from './DiamondLine.types';
import styles from './DiamondLine.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

const DiamondLine = (props: DiamondLineProps): JSX.Element => {
  const { side = 'right', theme = 'H-HCA-Tangerine' } = props;
  return (
    <div data-content="diamond">
      <Themes theme={theme}>
        <div
          className={`${styles.wrapper} ${styles[side]}`}
          data-animate="m"
          data-animate-delay
        >
          <span className={styles.icon}>
            <Icons iconName="iconDiamondOutline" />
          </span>
        </div>
      </Themes>
    </div>
  );
};

export default DiamondLine;
