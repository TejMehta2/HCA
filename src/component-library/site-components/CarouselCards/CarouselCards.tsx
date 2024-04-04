import React, { useEffect, useRef, useState } from 'react';
import { CarouselCardsProps } from './CarouselCards.types';
import styles from './CarouselCards.module.scss';
import Slider from '@ant-design/react-slick';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';
import { NextArrow, PrevArrow } from './CustomArrows';

const CarouselCards = (props: CarouselCardsProps): JSX.Element => {
  const { theme, title, link, children, bodyCopy, subtitle } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  /* fix for Tabindex of carousel ctas */
  useEffect(() => {
    const cards = carouselRef.current!.querySelectorAll('.slick-slide');

    if (!cards) return;

    /* On change of slide, check which slides are visible and adjsut tabindexes of ctas */
    cards.forEach((card) => {
      if (card.classList.contains('slick-active')) {
        card
          .querySelectorAll('a, button')
          ?.forEach((cta) => cta.setAttribute('tabindex', '0'));
      } else {
        card
          .querySelectorAll('a, button')
          ?.forEach((cta) => cta.setAttribute('tabindex', '-1'));
      }
    });
  }, [currentSlide]);

  /* Carousel settings */
  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    className: styles['slick-wrapper'],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (newSlide: number) => {
      setCurrentSlide(newSlide);
    },
    responsive: [
      {
        breakpoint: 1135,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Themes theme={theme}>
      <div className={styles['wrapper']}>
        <div className={styles['container']}>
          {title && (
            <div className={styles['intro']} data-animate="s">
              {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
              {title}
              {bodyCopy && <div className={styles['copy']}>{bodyCopy}</div>}
            </div>
          )}

          <div
            ref={carouselRef}
            className={styles['carousel-wrapper']}
            data-animate="m"
          >
            <Slider {...settings}>{children && children}</Slider>
          </div>

          {link && (
            <Themes theme={theme}>
              <Button size="large" variation="full-dark">
                {link}
              </Button>
            </Themes>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default CarouselCards;
