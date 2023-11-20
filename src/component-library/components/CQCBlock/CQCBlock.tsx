import React from 'react';
import { CQCBlockProps } from './CQCBlock.types';
import styles from './CQCBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';

const CQCBlock = (props: CQCBlockProps): JSX.Element => {
  const {
    logo,
    title,
    icon,
    text,
    rating,
    length = 'short',
    theme = 'light',
  } = props;

  const setTheme = theme === 'light' ? 'f' : 'e';

  const cqcLength = rating ? 'long' : length;
  const ratingClass = rating ? rating.replace(/\s+/g, '-').toLowerCase() : null;

  return (
    <Themes theme={setTheme}>
      <div
        className={[
          styles.wrapper,
          styles[cqcLength],
          rating ? styles.rating : '',
          ratingClass ? styles[ratingClass] : '',
          rating && theme === 'dark' ? styles.dark : '',
        ].join(' ')}
      >
        <div className={styles.logo}>
          {theme === 'light' ? logo.light : logo.dark}
        </div>
        <div className={styles.title}>
          <Text tag="span" variation="body-semi-bold-small">
            {rating ? rating : title}
          </Text>
          {cqcLength === 'long' && <span className={styles.icon}>{icon}</span>}
        </div>
        {text && (
          <div className={styles.text}>
            <Text tag="span" variation="body-small">
              {text}
            </Text>
          </div>
        )}
        {cqcLength === 'short' && <span className={styles.icon}>{icon}</span>}
      </div>
    </Themes>
  );
};

export default CQCBlock;
