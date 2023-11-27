import React, { Children } from 'react';
import { ServiceCardsProps } from './ServiceCards.types';
import styles from './ServiceCards.module.scss';

const ServiceCards = (props: ServiceCardsProps): JSX.Element => {
  const { children, title, subtitle, bodyText, cta } = props;

  console.log(Children.toArray(children));
  const childrenArray = Children.toArray(children);
  const serviceCardsArray = childrenArray[0].props.children;

  const col1 = [];
  for (let i = 0; serviceCardsArray < 1; i++) {
    col1.push(i);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.text}>
            <div>{subtitle}</div>
            <div>{title}</div>
            <div>{bodyText}</div>
            <div>{cta}</div>
          </div>
          {children && <div className={styles.cards}></div>}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
