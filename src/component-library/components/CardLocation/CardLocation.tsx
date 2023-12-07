import React from 'react';
import { CardLocationProps } from './CardLocation.types';
import styles from './CardLocation.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import TextLink from '../../core-components/TextLink/TextLink';

const CardLocation = (props: CardLocationProps): JSX.Element => {
  const { theme, image, title, address, distance, ctas } = props;
  return (
    <Themes theme={theme}>
      <div className={`${styles['wrapper']} ${ctas.close && styles['on-map']}`}>
        {image && <div className={styles['image']}>{image}</div>}

        <div className={styles['text-content']}>
          {ctas.close && (
            <div className={styles['close']}>
              <TextLink>{ctas.close}</TextLink>
            </div>
          )}
          {distance && <div>{distance}</div>}
          <div>{title}</div>
          <div className={styles['address']}>{address}</div>
          {ctas && (
            <div className={styles['ctas']}>
              {ctas.button1 && (
                <Button size="small" theme="full">
                  {ctas.button1}
                </Button>
              )}
              {ctas.button2 && <TextButton>{ctas.button2}</TextButton>}
            </div>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default CardLocation;
