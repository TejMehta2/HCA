import React from 'react';
import { CardContentProps } from './CardContent.types';
import styles from './CardContent.module.scss';
import Button from '../../core-components/Button/Button';

const CardContent = (props: CardContentProps): JSX.Element => {
  const { image, title, bodyCopy, link, imageKeepAspectRatio = false } = props;
  return (
    <div className={styles.card}>
      {image && (
        <div
          className={[
            styles['image'],
            imageKeepAspectRatio ? styles['keep-aspect-ratio'] : '',
          ].join(' ')}
        >
          {image}
        </div>
      )}
      <div className={styles['card-info']}>
        <div className={styles.copy}>
          <div className={styles.title}>{title}</div>
          {bodyCopy && <div className={styles['body-text']}>{bodyCopy}</div>}
        </div>
        {link && (
          <Button size="small" variation="full" contentVariation="card">
            {link}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardContent;
