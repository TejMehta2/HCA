import React from 'react';
import { CardLocationProps } from './CardLocation.types';
import styles from './CardLocation.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';

const CardLocation = (props: CardLocationProps): JSX.Element => {
  const { amount, title, cta, theme } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div>
          {amount}
          {title}
        </div>
        {cta && (
          <Button size="small" variation="outline">
            {cta}
          </Button>
        )}
      </div>
    </Themes>
  );
};

export default CardLocation;
