import React from 'react';
import { CQCBlockProps } from './CQCBlock.types';
import styles from './CQCBlock.module.scss';
import Text from '../../foundation/Text/Text';

const CQCBlock = (props: CQCBlockProps): JSX.Element => {
  const { logo, title, icon, text, rating, length = 'short', link } = props;

  const cqcLength = rating ? 'long' : length;
  const ratingClass = rating ? rating.replace(/\s+/g, '-').toLowerCase() : null;
  const blockTitle = rating ? rating : title;

  return (
    <div
      className={[
        styles.wrapper,
        styles[cqcLength],
        rating ? styles.rating : '',
        ratingClass ? styles[ratingClass] : '',
      ].join(' ')}
    >
      <div className={styles.link}>{link}</div>
      <div className={styles.logo}>
        <span className={styles['light-logo']}>{logo.light}</span>
        <span className={styles['dark-logo']}>{logo.dark}</span>
      </div>
      <div className={styles.content}>
        {blockTitle && (
          <div className={styles.title}>
            <Text tag="span" variation="body-bold-small">
              {blockTitle}
            </Text>
            <span className={styles.icon}>{icon}</span>
          </div>
        )}
        {text && (
          <div className={styles.text}>
            <Text tag="span" variation="body-small">
              {text}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default CQCBlock;
