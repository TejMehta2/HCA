import React from 'react';
import { RoleCardsProps } from './RoleCards.types';
import styles from './RoleCards.module.scss';

const RoleCards = (props: RoleCardsProps): JSX.Element => {
  const { subtitle, title, bodyText, children, id } = props;
  return (
    <div className={styles.wrapper} id={id}>
      <div className={styles.container}>
        <div className={styles['sticky-track']}>
          <div className={styles['sticky']}>
            <div className={styles.subtitle}>{subtitle}</div>
            <div className={styles.title}>{title}</div>
            <div className={styles['body-text']}>{bodyText}</div>
          </div>
        </div>
        <div className={styles.cards}>{children}</div>
      </div>
    </div>
  );
};

export default RoleCards;
