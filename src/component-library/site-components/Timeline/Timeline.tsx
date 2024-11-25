import React from 'react';
import { TimelineProps, TimelineStepProps } from './Timeline.types';
import styles from './Timeline.module.scss';

export const TimelineStep = (props: TimelineStepProps): JSX.Element => {
  const { heading, copy, index } = props;
  return (
    <div className={styles.step}>
      {index && <div className={styles.index}>{index}</div>}
      <div className={styles.content}>
        {heading && <div className={styles.heading}>{heading}</div>}
        {copy && <div className={styles.copy}>{copy}</div>}
      </div>
    </div>
  );
};

const Timeline = (props: TimelineProps): JSX.Element => {
  const { subheading, heading, copy, children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.track}>
          <div className={styles.sticky}>
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
            {heading && <div className={styles.heading}>{heading}</div>}
            {copy && <div className={styles.copy}>{copy}</div>}
          </div>
        </div>
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
};

export default Timeline;
