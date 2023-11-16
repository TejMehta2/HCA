import React from 'react';
import { CardPatientStoriesProps } from './CardPatientStories.types';
import styles from './CardPatientStories.module.scss';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';

const CardPatientStories = (props: CardPatientStoriesProps): JSX.Element => {
  const { image, title, bodyCopy, link } = props;
  return (
    <div className={styles.card}>
      <div className={styles.image}>{image}</div>
      <div className={styles['card-info']}>
        <div className={styles.copy}>
          <Text tag="h3" variation="display-4">
            {title}
          </Text>
          <Text tag="p" variation="body-large">
            {bodyCopy}
          </Text>
        </div>
        <Button size="small" theme="full-dark">
          {link}
        </Button>
      </div>
    </div>
  );
};

export default CardPatientStories;
