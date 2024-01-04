import React from 'react';
import { CQCBlockProps } from './CQCBlock.types';
import styles from './CQCBlock.module.scss';
import Text from '../../foundation/Text/Text';
import useWindowWidth from '../../hooks/useWindowWidth';

const CQCBlock = (props: CQCBlockProps): JSX.Element => {
  const {
    logo,
    title,
    icon,
    text,
    rating,
    length = 'short',

    link,
  } = props;

  const cqcLength = rating ? 'long' : length;
  const ratingClass = rating ? rating.replace(/\s+/g, '-').toLowerCase() : null;
  const blockTitle = rating ? rating : title;

  //  medium screen breakpoint
  const isScreenM = useWindowWidth(600);

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
      <div className={styles.title}>
        {blockTitle && (
          <Text tag="span" variation="body-semi-bold-small">
            {blockTitle}
          </Text>
        )}
        {cqcLength === 'long' && isScreenM && (
          <span className={styles.icon}>{icon}</span>
        )}
      </div>
      {text && (
        <div className={styles.text}>
          <Text tag="span" variation="body-small">
            {text}
          </Text>
        </div>
      )}
      {((cqcLength === 'long' && !isScreenM) || cqcLength === 'short') && (
        <span className={styles.icon}>{icon}</span>
      )}
    </div>
  );
};

export default CQCBlock;
