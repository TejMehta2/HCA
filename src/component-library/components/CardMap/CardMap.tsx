import React from 'react';
import { CardMapProps } from './CardMap.types';
import styles from './CardMap.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';

const CardMap = (props: CardMapProps): JSX.Element => {
  const { amount, title, cta, theme } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div>
          {amount}
          {title}
        </div>
        {cta && (
          <Button size="small" theme="outline">
            {cta}
          </Button>
        )}
      </div>
    </Themes>
  );
};

export default CardMap;
