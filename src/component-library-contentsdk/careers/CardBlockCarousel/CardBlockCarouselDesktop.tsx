'use client';

import React, { type JSX } from 'react';
import { CardBlockCarouselProps } from './CardBlockCarousel.types';
import styles from './CardBlockCarouselDesktop.module.scss';
import Text from '../../foundation/Text/Text';
import Slider from '@ant-design/react-slick';
import {
  NextArrow,
  PrevArrow,
} from '../../site-components/CarouselCards/CustomArrows';

const CardBlockCarouselDesktop = (
  props: CardBlockCarouselProps
): JSX.Element => {
  const { cards } = props;

  /* Carousel settings */
  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    className: styles['slick-wrapper'],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const firstCard = (
    <div className={styles['first-card']}>
      <div className={styles.image}>{cards[0].image && cards[0].image}</div>
      <div className={styles.content}>
        {cards[0].icon}
        <Text variation="display-4">{cards[0].title}</Text>
        {cards[0].bodyText}
      </div>
    </div>
  );

  const otherCards = cards.slice(1).map((card, index) => (
    <div className={styles.card} key={index}>
      {card.icon}
      <Text variation="heading-2">{card.title}</Text>
      {card.bodyText}
    </div>
  ));

  const cardGroups: React.JSX.Element[] = [];

  // Loop through the array in groups of 4
  for (let i = 0; i < otherCards.length; i += 4) {
    // Slice the next group of 4 divs
    const group = otherCards.slice(i, i + 4);

    cardGroups.push(
      <React.Fragment key={i}>
        <div className={styles['card-group']}>{group}</div>
      </React.Fragment>
    );
  }

  return (
    <div className={styles.wrapper} data-animate="m">
      <div className={styles.container}>
        <Slider {...settings}>
          {firstCard}
          {cardGroups}
        </Slider>
      </div>
    </div>
  );
};

export default CardBlockCarouselDesktop;
