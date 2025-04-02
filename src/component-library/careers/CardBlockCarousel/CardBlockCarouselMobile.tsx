import React from 'react';
import { CardBlockCarouselProps } from './CardBlockCarousel.types';
import styles from './CardBlockCarouselMobile.module.scss';
import Accordions from '../../components/Accordions/Accordions';
import Text from '../../foundation/Text/Text';

const CardBlockCarouselMobile = (
  props: CardBlockCarouselProps
): JSX.Element => {
  const { cards } = props;

  const accordionArray = Array.from(cards.slice(1), (card) => {
    return {
      title: card.title,
      children: card.bodyText,
    };
  });

  const firstCard = (
    <div className={styles['first-card']}>
      <div className={styles.image}>{cards[0].image}</div>
      <div className={styles.content}>
        {cards[0].icon}
        <Text variation="heading-1">{cards[0].title}</Text>
        {cards[0].bodyText}
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper} data-animate="m">
      {firstCard}
      <Accordions accordions={accordionArray} />
    </div>
  );
};

export default CardBlockCarouselMobile;
