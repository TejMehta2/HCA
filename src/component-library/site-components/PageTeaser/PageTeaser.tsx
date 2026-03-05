import React from 'react';
import { PageTeaserProps } from './PageTeaser.types';
import styles from './PageTeaser.module.scss';
import TextButton from '../../core-components/TextButton/TextButton';

const PageTeaser = (props: PageTeaserProps): JSX.Element => {
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
        {link && <TextButton theme="dark">{link}</TextButton>}
      </div>
    </div>
  );
};

export default PageTeaser;
