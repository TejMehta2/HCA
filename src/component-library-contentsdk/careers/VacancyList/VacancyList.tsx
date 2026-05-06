import React, { type JSX } from 'react';
import { VacancyListProps } from './VacancyList.types';
import styles from './VacancyList.module.scss';

const VacancyList = (props: VacancyListProps): JSX.Element => {
  const { title, filters, cards, cta } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          {title && <div className={styles.title}>{title}</div>}
          {filters && <div className={styles.filters}>{filters}</div>}
        </div>
        {cards && <div className={styles.cards}>{cards}</div>}
        {cta && <div className={styles.cta}>{cta}</div>}
      </div>
    </div>
  );
};

export default VacancyList;
