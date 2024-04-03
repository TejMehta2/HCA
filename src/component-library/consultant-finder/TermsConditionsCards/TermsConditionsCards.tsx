import React from 'react';
import { TermsConditionsCardsProps } from './TermsConditionsCards.types';
import styles from './TermsConditionsCards.module.scss';

const TermsConditionsCards = (
  props: TermsConditionsCardsProps
): JSX.Element => {
  const { children } = props;
  return <div className={styles.terms}>{children}</div>;
};

export default TermsConditionsCards;
