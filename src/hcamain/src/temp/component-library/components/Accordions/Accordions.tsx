import React, { useState } from 'react';
import { AccordionsProps } from './Accordions.types';
import styles from './Accordions.module.scss';
import Accordion from '../../components/Accordion/Accordion';

const Accordions = (props: AccordionsProps): JSX.Element => {
  const {
    accordions,
    openIcon = 'iconPlus',
    closeIcon = 'iconMinus',
    id,
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
    <div
      className={styles.accordions}
      data-navigation-type="accordionClick"
      id={id}
    >
      {accordions.map(({ title, children, contentVariation }, index) => (
        <Accordion
          key={index}
          title={title}
          isActive={activeIndex === index}
          onShow={() => onShow(index)}
          openIcon={openIcon}
          closeIcon={closeIcon}
          contentVariation={contentVariation}
        >
          {children}
        </Accordion>
      ))}
    </div>
  );
};

export default Accordions;
