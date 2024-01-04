import React from 'react';
import { CTABlockProps } from './CTABlock.types';
import styles from './CTABlock.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const CTABlock = (props: CTABlockProps): JSX.Element => {
  const { header, subheader, children, ctas, theme } = props;
  return (
    <Themes theme={theme}>
      <div className={styles['wrapper']}>
        <div className={styles['container']}>
          <div className={styles['text-column']}>
            <div>{subheader}</div>
            <div className={styles['header']}>{header}</div>
            <div className={styles['body-text']}>{children}</div>
          </div>
          {ctas && (
            <div className={styles['ctas']}>
              {ctas.button1 && (
                <Button size="large" theme="full">
                  {ctas.button1}
                </Button>
              )}
              {ctas.button2 && (
                <Button size="large" theme="outline">
                  {ctas.button2}
                </Button>
              )}
              {ctas.button3 && <TextButton>{ctas.button3}</TextButton>}
            </div>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default CTABlock;
