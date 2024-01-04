import React from 'react';
import { CardContentProps } from './CardContent.types';
import styles from './CardContent.module.scss';
import Button from '../../core-components/Button/Button';

const CardContent = (props: CardContentProps): JSX.Element => {
  const { image, title, bodyCopy, link } = props;
  return (
    <div className={styles.card}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles['card-info']}>
        <div className={styles.copy}>
          {title}
          {bodyCopy && <div className={styles['body-text']}>{bodyCopy}</div>}
        </div>
        <Button size="small" theme="full">
          {link}
        </Button>
      </div>
    </div>
  );
};

export default CardContent;
