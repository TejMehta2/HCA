import React from 'react';
import { ServiceCardsProps } from './ServiceCards.types';
import styles from './ServiceCards.module.scss';
import useWindowWidth from '../../hooks/useWindowWidth';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';

const ServiceCards = (props: ServiceCardsProps): JSX.Element => {
  const { children, title, subtitle, bodyText, cta } = props;

  const isL = useWindowWidth(1135);

  const serviceCardsArray = children && children;

  //split the cards into two columns to acheive layout on L screen size
  const col1 = serviceCardsArray && [...serviceCardsArray].splice(0, 2);
  const col2 = serviceCardsArray && [...serviceCardsArray].splice(2, 5);

  return (
    <>
      {/* confirmed with Design this component is only intended to use this theme */}
      <Themes theme="I-HCA-Goldenrod">
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.text} data-animate="s">
                <div className={styles['sticky-track']}>
                  <div className={styles.sticky}>
                    <div>
                      {subtitle}
                      <div className={styles.title}>{title}</div>
                      <div className={styles['body-text']}>{bodyText}</div>
                      <div className={styles.cta}>
                        <Button size="large" variation="outline-dark">
                          {cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cards} data-animate="l">
                <div className={styles.row}>
                  {isL && (
                    <>
                      <div className={styles['col-1']}>{col1}</div>
                      <div className={styles['col-2']}>{col2}</div>
                    </>
                  )}
                  {!isL && children && children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Themes>
    </>
  );
};

export default ServiceCards;
