import React, { useState, useId } from 'react';
import { AccordionsProps } from './Accordions.types';
import styles from './Accordions.module.scss';
import Accordion from '../../components/Accordion/Accordion';

const Accordions = (props: AccordionsProps): JSX.Element => {
  const {
    accordions,
    openIcon = 'iconPlus',
    closeIcon = 'iconMinus',
    id,
    isFilters
  } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const accordionContentId = useId();
  const onShow = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);

      if (isFilters) {
        setTimeout(() => {
          const heading = document.getElementById(`accordion-heading-${index}-${accordionContentId}`);
          const stickyHeader = document.getElementById('header');
          if (heading) {
            let headerHeight = 0;
            if (stickyHeader) {
              headerHeight = stickyHeader.offsetHeight;
            }
            const headingTop =
              heading.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: headingTop - headerHeight - 10, // 10px optional spacing
              behavior: 'smooth',
            });
          }
        }, 100);
      }
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
          onShow={() => {
            onShow(index)
          }}
          openIcon={openIcon}
          closeIcon={closeIcon}
          contentVariation={contentVariation}
          id={`accordion-heading-${index}-${accordionContentId}`}
        >
          {children}
        </Accordion>
      ))}
    </div>
  );
};

export default Accordions;
