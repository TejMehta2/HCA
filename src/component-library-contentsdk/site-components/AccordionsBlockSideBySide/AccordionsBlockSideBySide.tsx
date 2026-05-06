import React, { type JSX } from 'react';
import { AccordionsBlockSideBySideProps } from './AccordionsBlockSideBySide.types';
import styles from './AccordionsBlockSideBySide.module.scss';
import Accordions from '../../components/Accordions/Accordions';
import Themes from '../../foundation/Themes/Themes';

const AccordionsBlockSideBySide = (
  props: AccordionsBlockSideBySideProps
): JSX.Element => {
  const { theme, subtitle, header, body, accordions, ctas, id, tableOfContentTitle } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles['text-content']}>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            {header && header}
            {body && <div className={styles.body}>{body}</div>}
            {ctas && <div className={styles.ctas}>{ctas}</div>}
          </div>
          <div className={styles.accordions}>
            <Accordions accordions={accordions} />
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default AccordionsBlockSideBySide;
