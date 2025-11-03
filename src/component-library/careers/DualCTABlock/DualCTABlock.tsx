import React from 'react';
import { DualCTABlockProps } from './DualCTABlock.types';
import styles from './DualCTABlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const DualCTABlock = (props: DualCTABlockProps): JSX.Element => {
  const { content, theme, id, tableOfContentTitle } = props;
  return (
    <Themes theme={theme || 'A-HCA-White'} id={id} tableOfContentTitle={tableOfContentTitle}>
      {content && <div className={styles['wrapper']}>{content}</div>}
    </Themes>
  );
};

export default DualCTABlock;
