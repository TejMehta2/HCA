import React, { useState } from 'react';
import { AccordionGroupProps } from './AccordionGroup.types';
import styles from './AccordionGroup.module.scss';
import Button from '../../core-components/Button/Button';
import Accordion from '../Accordion/Accordion';

const AccordionGroup = (props: AccordionGroupProps): JSX.Element => {
  const { header, accordions, cta } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles['accordion-group']}>
      {header && <div className={styles.header}>{header}</div>}

      <div className={styles.accordions}>
        {accordions.map(({ title, children }, index) => (
          <Accordion
            key={index}
            title={title}
            isActive={activeIndex === index}
            onShow={() => setActiveIndex(index)}
          >
            {children}
          </Accordion>
        ))}
      </div>

      {cta && (
        <div className={styles.cta}>
          <Button theme="full-dark" size="large">
            {cta}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccordionGroup;
