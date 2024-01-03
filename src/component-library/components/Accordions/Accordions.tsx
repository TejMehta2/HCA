import React, { useState } from 'react';
import { AccordionsProps } from './Accordions.types';
import styles from './Accordions.module.scss';
import Button from '../../core-components/Button/Button';
import Accordion from '../Accordion/Accordion';

const Accordions = (props: AccordionsProps): JSX.Element => {
  const {
    header,
    accordions,
    cta,
    openIcon = 'iconPlus',
    closeIcon = 'iconMinus',
  } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onShow = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };

  return (
    <div className={styles['accordion-group']}>
      {header && <div className={styles.header}>{header}</div>}

      <div className={styles.accordions}>
        {accordions.map(({ title, children }, index) => (
          <Accordion
            key={index}
            title={title}
            isActive={activeIndex === index}
            onShow={() => onShow(index)}
            openIcon={openIcon}
            closeIcon={closeIcon}
          >
            {children}
          </Accordion>
        ))}
      </div>

      {cta && (
        <div className={styles.cta}>
          <Button theme="full" size="large">
            {cta}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Accordions;
