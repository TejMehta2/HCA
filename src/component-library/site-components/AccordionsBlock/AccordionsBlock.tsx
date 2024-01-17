import React from 'react';
import { AccordionsBlockProps } from './AccordionsBlock.types';
import styles from './AccordionsBlock.module.scss';
import Button from '../../core-components/Button/Button';
import Accordions from '../../components/Accordions/Accordions';
import Themes from '../../foundation/Themes/Themes';

const AccordionsBlock = (props: AccordionsBlockProps): JSX.Element => {
  const { theme, header, accordions, cta } = props;

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {header && <div className={styles.header}>{header}</div>}

          <Accordions accordions={accordions} />

          {cta && (
            <div className={styles.cta}>
              <Button theme="full" size="large">
                {cta}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default AccordionsBlock;
