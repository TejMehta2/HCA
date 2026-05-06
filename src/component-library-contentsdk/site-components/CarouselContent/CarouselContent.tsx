import React, { type JSX } from 'react';
import { CarouselContentProps } from './CarouselContent.types';
import styles from './CarouselContent.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { NextArrow, PrevArrow } from '../CarouselCards/CustomArrows';
import Slider from '@ant-design/react-slick';

const CarouselContent = (props: CarouselContentProps): JSX.Element => {
  const { slides, theme, id, tableOfContentTitle } = props;

  const renderedSlides = slides.map((slide, index) => {
    /* Fragment is needed to get around a bug with react-slick. 
    Without it, the carousel automatically applies some inline styles which break the appearance */
    return (
      <React.Fragment key={index}>
        <div className={styles.slide}>
          <div className={styles.image}>{slide.image}</div>
          <div className={`${styles.text} ${!slide.image ? styles.noImagePadding : ''}`}>
            {slide.title}
            {slide.body}
          </div>
        </div>
      </React.Fragment>
    );
  });

  /* Carousel settings */
  const settings = {
    speed: 1800,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    className: styles['slick-wrapper'],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
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
