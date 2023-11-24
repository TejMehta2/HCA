import React, { useEffect, useRef, useState } from 'react';
import { CarouselCardsProps } from './CarouselCards.types';
import styles from './CarouselCards.module.scss';
import Slider, { CustomArrowProps } from '@ant-design/react-slick';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

/* Custom previous arrow */
const PrevArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <Button size="small" theme="standard-carousel-dark">
        <button onClick={onClick} disabled={onClick === null && true}>
          <Icons iconName="iconArrowLeft" />
          <span className="sr-only">Previous Slide</span>
        </button>
      </Button>
    </div>
  );
};

/* Custom next arrow */
const NextArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <Button size="small" theme="standard-carousel-dark">
        <button onClick={onClick} disabled={onClick === null && true}>
          <Icons iconName="iconArrowRight" />
          <span className="sr-only">Next Slide</span>
        </button>
      </Button>
    </div>
  );
};

const CarouselCards = (props: CarouselCardsProps): JSX.Element => {
  const { title, link, children } = props;
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
    <Themes theme="c">
      <div className={styles['wrapper']}>
        <div className={styles['container']}>
          <div className={styles['intro']}>
            <Text tag="h2" variation="display-3">
              {title}
            </Text>
          </div>

          <div ref={carouselRef} className={styles['carousel-wrapper']}>
            <Slider {...settings}>
              {children && children[0].props.children}
            </Slider>
          </div>

          <Button size="large" theme="full-dark">
            {link}
          </Button>
        </div>
      </div>
    </Themes>
  );
};

export default CarouselCards;
