import React from 'react';
import { DualCTABlockProps } from './DualCTABlock.types';
import styles from './DualCTABlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const DualCTABlock = (props: DualCTABlockProps): JSX.Element => {
  const { content, theme, id } = props;
  return (
    <Themes theme={theme || 'A-HCA-White'} id={id}>
      <div className={styles['wrapper']}>
        {content?.map((CTABlock, index) => (
          <div
            className={styles['item-wrapper']}
            key={index}
            data-animate="xs"
            data-animate-delay={index > 0 ? 'true' : 'false'}
          >
            <div className={styles['container']}>
              <div className={styles['text-column']}>
                <div>{CTABlock.subheader}</div>
                <div className={styles['header']}>{CTABlock.header}</div>
                <div className={styles['body-text']}>{CTABlock.bodyCopy}</div>
              </div>
              {CTABlock.cta && (
                <div className={styles['cta']}>{CTABlock.cta}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Themes>
  );
};

export default DualCTABlock;
