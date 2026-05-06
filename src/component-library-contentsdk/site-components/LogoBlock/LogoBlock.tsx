import React, { type JSX } from 'react';
import { LogoBlockProps } from './LogoBlock.types';
import styles from './LogoBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const LogoBlock = (props: LogoBlockProps): JSX.Element => {
  const {
    logos,
    header,
    theme = 'A-HCA-White',
    variation = 'standard',
    columns = 4,
    id,
    tableOfContentTitle
  } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div
        className={[
          styles.wrapper,
          styles[variation],
          styles[`columns-${columns}`],
        ].join(' ')}
      >
        <div className={styles.content}>
          <div className={styles.header}>{header}</div>
          {logos && (
            <div className={styles.logos}>
              {logos.map((logo, index) => (
                <div className={styles.logo} key={index}>
                  {logo}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default LogoBlock;
