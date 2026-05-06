import React, { type JSX } from 'react';
import { HeaderTextProps } from './HeaderText.types';
import styles from './HeaderText.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const HeaderText = (props: HeaderTextProps): JSX.Element => {
  const { subtitle, title, error, description, cta, fullHeight = true } = props;
  return (
    <div className={styles.background}>
      <div
        className={[styles.grid, styles[fullHeight ? 'full-height' : '']].join(
          ' '
        )}
      >
        <div className={styles.inner}>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.title}>
            {title}
            <div className={styles.error}>
              <Icons iconName="iconWarning" />
              <Text variation="body-medium-medium">{error}</Text>
            </div>
          </div>

          <div className={styles.description}>{description}</div>
          <div className={styles.cta}>{cta}</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderText;
