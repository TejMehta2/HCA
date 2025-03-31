import React from 'react';
import { OffsetTextBlockProps } from './OffsetTextBlock.types';
import styles from './OffsetTextBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const OffsetTextBlock = (props: OffsetTextBlockProps): JSX.Element => {
  const { theme = 'A-HCA-White', title, bodyCopy, cta, id } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper} id={id}>
        <div className={styles.container}>
          {title && (
            <div className={styles.title} data-animate="xs">
              {title}
            </div>
          )}
          <div className={styles['offset-content']} data-animate="s">
            {bodyCopy && <div className={styles.text}>{bodyCopy}</div>}

            {cta && (
              <Themes theme={theme}>
                <div className={styles.cta}>{cta}</div>
              </Themes>
            )}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default OffsetTextBlock;
