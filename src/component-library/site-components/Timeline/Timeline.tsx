import React from 'react';
import { TimelineProps, TimelineStepProps } from './Timeline.types';
import styles from './Timeline.module.scss';
import Button from '../../core-components/Button/Button';

export const TimelineStep = (props: TimelineStepProps): JSX.Element => {
  const { heading, copy, index, link } = props;
  return (
    <div className={styles.step}>
      {index && <div className={styles.index}>{index}</div>}
      <div className={styles.content}>
        {heading && <div className={styles.heading}>{heading}</div>}
        {copy && <div className={styles.copy}>{copy}</div>}
        {link && (
          <div className={styles.link}>
            <Button size="small" variation="full">
              {link}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Timeline = (props: TimelineProps): JSX.Element => {
  const { subheading, heading, copy, ctas, children, id } = props;
  return (
    <div className={styles.wrapper} id={id}>
      <div className={styles.container}>
        <div className={styles.track}>
          <div className={styles.sticky}>
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
            {heading && <div className={styles.heading}>{heading}</div>}
            {copy && <div className={styles.copy}>{copy}</div>}
            {ctas && <div className={styles.ctas}>{ctas}</div>}
          </div>
        </div>
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
};

export default Timeline;
