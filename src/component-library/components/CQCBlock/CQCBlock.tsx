import React, { useState, useEffect } from 'react';
import { CQCBlockProps } from './CQCBlock.types';
import styles from './CQCBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';

const useWindowWidth = (size: number) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWidth]);

  return width >= size;
};

const CQCBlock = (props: CQCBlockProps): JSX.Element => {
  const {
    logo,
    title,
    icon,
    text,
    rating,
    length = 'short',
    theme = 'light',
    link,
  } = props;

  const setTheme = theme === 'light' ? 'f' : 'e';

  const cqcLength = rating ? 'long' : length;
  const ratingClass = rating ? rating.replace(/\s+/g, '-').toLowerCase() : null;
  const blockTitle = rating ? rating : title;

  //  medium screen breakpoint
  const isScreenM = useWindowWidth(600);

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
        <div className={styles.link}>{link}</div>
        <div className={styles.logo}>
          {theme === 'light' ? logo.light : logo.dark}
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
    </Themes>
  );
};

export default CQCBlock;
