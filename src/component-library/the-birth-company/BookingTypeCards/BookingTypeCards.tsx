import React from 'react';
import { BookingTypeCardsProps } from './BookingTypeCards.types';
import styles from './BookingTypeCards.module.scss';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

const BookingTypeCards = (props: BookingTypeCardsProps): JSX.Element => {
  const { cards = [] } = props;
  return (
    <Themes theme="A-HCA-White">
      <div className={styles.wrapper}>
        {cards.length &&
          cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.container}>
                <Text variation="body-medium-extra-large" tag="h3">
                  {card.title}
                </Text>
                <div className={styles.copy}>
                  <Text variation="body-small" tag="p">
                    {card.copy}
                  </Text>
                </div>
                <div className={styles.cta}>{card.cta}</div>
              </div>
            </div>
          ))}
      </div>
    </Themes>
  );
};

export default BookingTypeCards;
