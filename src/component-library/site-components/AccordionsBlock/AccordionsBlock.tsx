import React from 'react';
import { AccordionsBlockProps } from './AccordionsBlock.types';
import styles from './AccordionsBlock.module.scss';
import Accordions from '../../components/Accordions/Accordions';
import Themes from '../../foundation/Themes/Themes';

const AccordionsBlock = (props: AccordionsBlockProps): JSX.Element => {
  const { theme, subtitle, header, body, accordions, ctas } = props;

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.heading}>
              {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
              {header && header}
              {body && <div className={styles.body}>{body}</div>}
            </div>
            <Accordions accordions={accordions} />

            {ctas && <div className={styles.ctas}>{ctas}</div>}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default AccordionsBlock;
