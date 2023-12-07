import React from 'react';
import { CarouselContentProps } from './CarouselContent.types';
import styles from './CarouselContent.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { NextArrow, PrevArrow } from '../CarouselCards/CustomArrows';
import Slider from '@ant-design/react-slick';

const CarouselContent = (props: CarouselContentProps): JSX.Element => {
  const { slides, theme } = props;

  const renderedSlides = slides.map((slide, index) => {
    return (
      <div key={index} className={styles.slide}>
        <div>
          {slide.title}
          {slide.body}
        </div>
        <div>{slide.image}</div>
      </div>
    );
  });

  /* Carousel settings */
  const settings = {
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    className: styles['slick-wrapper'],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <Slider {...settings}>{renderedSlides}</Slider>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default CarouselContent;
