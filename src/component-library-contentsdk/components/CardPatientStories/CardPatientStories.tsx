import React from 'react';
import { CardPatientStoriesProps } from './CardPatientStories.types';
import styles from './CardPatientStories.module.scss';
import Button from '../../core-components/Button/Button';

const CardPatientStories = (props: CardPatientStoriesProps): JSX.Element => {
  const { image, title, bodyCopy, link, contentVariation } = props;
  return (
    <div
      className={[
        [styles.card],
        contentVariation && styles[contentVariation],
      ].join(' ')}
    >
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles['card-info']}>
        <div className={styles.copy}>
          <div className={styles.title}>{title}</div>
          {bodyCopy && <div className={styles['body-text']}>{bodyCopy}</div>}
        </div>
        <Button
          size="small"
          variation="full"
          contentVariation={contentVariation === 'mixed' ? undefined : 'card'}
        >
          {link}
        </Button>
      </div>
    </div>
  );
};

export default CardPatientStories;
