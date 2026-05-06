import React, { KeyboardEvent, useId, type JSX } from 'react';
import { AccordionProps } from './Accordion.types';
import styles from './Accordion.module.scss';
import Icons from '../../foundation/Icons/Icons';

const Accordion = (props: AccordionProps): JSX.Element => {
  const {
    children,
    title,
    isActive,
    onShow,
    openIcon = 'iconPlus',
    closeIcon = 'iconMinus',
    contentVariation,
    id,
  } = props;

  const accordionContentId = useId();

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
      className={[
        styles.accordion,
        styles[isActive ? 'open' : 'closed'],
        contentVariation && styles[contentVariation],
      ].join(' ')}
      id={id}
    >
      <button
        className={styles.trigger}
        onClick={handleAccordionClick}
        onKeyDown={handleKeydown}
        aria-expanded={isActive}
        aria-controls={accordionContentId}
        type="button"
      >
        <h3>{title}</h3>
        <span className={styles.toggle}>
          <Icons iconName={closeIcon}></Icons>
          <Icons iconName={openIcon}></Icons>
        </span>
      </button>
      <div className={styles.content} id={accordionContentId}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
