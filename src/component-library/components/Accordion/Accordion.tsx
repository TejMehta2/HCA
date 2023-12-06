import React, { KeyboardEvent } from 'react';
import { AccordionProps } from './Accordion.types';
import styles from './Accordion.module.scss';
import Icons from '../../foundation/Icons/Icons';
import { v4 as uuidv4 } from 'uuid';

const Accordion = (props: AccordionProps): JSX.Element => {
  const { children, title, isActive, onShow } = props;

  const accordionContentId = uuidv4();

  const handleKeydown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      () => onShow();
    }
  };

  const handleAccordionClick = () => {
    onShow();
  };

  return (
    <div
      className={[styles.accordion, styles[isActive ? 'open' : 'closed']].join(
        ' '
      )}
    >
      <button
        className={styles.trigger}
        onClick={handleAccordionClick}
        onKeyDown={handleKeydown}
        aria-expanded={isActive}
        aria-controls={accordionContentId}
      >
        {title}
        <span className={styles.toggle}>
          <Icons iconName="iconMinus"></Icons>
          <Icons iconName="iconPlus"></Icons>
        </span>
      </button>
      <div className={styles.content} id={accordionContentId}>
        {isActive && children}
      </div>
    </div>
  );
};

export default Accordion;
