import React from 'react';
import styles from './PaddingCollapse.module.scss';
import Themes from '../../foundation/Themes/Themes';

const PaddingCollapse = (): JSX.Element => {
  return (
    <>
      <div className={styles['test-wrapper']}>
        Two different themes side by side
        <Themes theme="G-HCA-Orange">
          <div className={styles.content}>Test</div>
        </Themes>
        <Themes theme="F-HCA-Fern">
          <div className={styles.content}>Test</div>
        </Themes>
      </div>
      <div className={styles['test-wrapper']}>
        Two of the same theme side by side
        <Themes theme="D-HCA-Light-Orange">
          <div className={styles.content}>Test</div>
        </Themes>
        <Themes theme="D-HCA-Light-Orange">
          <div className={styles.content}>Test</div>
        </Themes>
      </div>
      <div className={styles['test-wrapper']}>
        Two of the same theme side by side nested
        <Themes theme="G-HCA-Green-40">
          <div className={styles.content}>Test</div>
          <Themes theme="D-HCA-Light-Orange">
            <div className={styles.content}>Test</div>
          </Themes>
          <Themes theme="D-HCA-Light-Orange">
            <div className={styles.content}>Test</div>
          </Themes>
        </Themes>
      </div>
    </>
  );
};

export default PaddingCollapse;
