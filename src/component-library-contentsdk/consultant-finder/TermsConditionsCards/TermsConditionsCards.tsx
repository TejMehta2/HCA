import React from 'react';
import { TermsConditionsCardsProps } from './TermsConditionsCards.types';
import styles from './TermsConditionsCards.module.scss';

const TermsConditionsCards = (
  props: TermsConditionsCardsProps
): JSX.Element => {
  const { children, acceptBtn } = props;
  return (
    <div className={styles['terms-wrapper']}>
      <div className={styles.terms}>{children}</div>
      <div className={styles.accept}>{acceptBtn}</div>
    </div>
  )
};

export default TermsConditionsCards;
