import React from 'react';
import styles from './_ScrollIntoView.module.scss';
import Text from '../../foundation/Text/Text';
import { useInView } from 'react-intersection-observer';

const ScrollIntoView = (): JSX.Element => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.component} ${styles['slide-up-stagger']} ${
          inView ? styles['active'] : ''
        }`}
        ref={ref}
      >
        <div>
          <Text variation="display-1">Committed to your care</Text>
        </div>
        <div>IMAGE</div>
      </div>
    </div>
  );
};

export default ScrollIntoView;
