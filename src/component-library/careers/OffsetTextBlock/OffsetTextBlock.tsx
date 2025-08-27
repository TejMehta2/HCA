import React from 'react';
import { OffsetTextBlockProps } from './OffsetTextBlock.types';
import styles from './OffsetTextBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const OffsetTextBlock = (props: OffsetTextBlockProps): JSX.Element => {
  const {
    theme = 'A-HCA-White',
    subheading,
    title,
    bodyCopy,
    ctas,
    tableOfContentTitle,
    id,
  } = props;
  return (
    <Themes theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper} id={id}>
        <div className={styles.container}>
          {subheading && (
            <div className={styles.subheading} data-animate="xs">
              {subheading}
            </div>
          )}
          {title && (
            <div className={styles.title} data-animate="xs">
              {title}
            </div>
          )}
          <div className={styles['offset-content']} data-animate="s">
            {bodyCopy && <div className={styles.text}>{bodyCopy}</div>}

            {ctas && (
              <Themes theme={theme}>
                <div className={styles.ctas}>{ctas}</div>
              </Themes>
            )}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default OffsetTextBlock;
