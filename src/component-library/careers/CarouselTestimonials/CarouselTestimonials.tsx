import React, { useEffect, useRef, useState } from 'react';
import { CarouselTestimonialsProps } from './CarouselTestimonials.types';
import styles from './CarouselTestimonials.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Slider from '@ant-design/react-slick';
import Icons from '../../foundation/Icons/Icons';

const CarouselTestimonials = (
  props: CarouselTestimonialsProps
): JSX.Element => {
  const { id, theme, subtitle, title, slides } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const [degrees, setDegrees] = useState(0);
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const duration = 15;
    const degressPerSecond = 360 / duration / 10;

    //Implementing the setInterval method
    const interval = setInterval(() => {
      setDegrees(Math.floor(degrees + degressPerSecond));
    }, 100);

    if (paused) {
      clearInterval(interval);
    }

    if (degrees >= 360) {
      clearInterval(interval);

      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }

    // testing purpose
    //clearInterval(interval);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [degrees, paused]);

  const toggleInterval = () => {
    setPaused(!paused);
  };

  const customThumbnail = (i: number) => (
    <button
      className={styles.thumbnail}
      style={
        activeSlide === i
          ? {
              ['--carousel-degrees' as string]: `${degrees}deg`,
            }
          : {}
      }
    >
      <div className={styles['thumbnail-image']}>
        {slides[i].thumbnail}
        {activeSlide === i && (
          <button className={styles.controls} onClick={toggleInterval}>
            {paused ? (
              <Icons iconName="iconPlay" />
            ) : (
              <Icons iconName="iconPause" />
            )}
          </button>
        )}
      </div>
    </button>
  );

  const renderedSlides = slides.map((slide, index) => (
    <React.Fragment key={index}>
      <div className={styles.slide}>
        <div className={styles['slide-text']}>
          <Icons iconName="iconQuotes" />
          {slide.body}
          <div className={styles['slide-name']}>
            {slide.name}
            {slide.role}
          </div>
        </div>
        <div className={styles['slide-image']}>{slide.image}</div>
      </div>
    </React.Fragment>
  ));

  /* Carousel settings */
  const settings = {
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    waitForAnimate: false,
    swipe: false,
    className: styles['slick-wrapper'],
    dots: true,
    dotsClass: 'slick-thumb',
    customPaging: customThumbnail,
    beforeChange: (_current: number, next: number) => {
      setActiveSlide(next);
      setDegrees(0);
    },
  };

  const slider = (
    // eslint-disable-next-line
    // @ts-ignore
    <Slider {...settings} ref={sliderRef}>
      {renderedSlides}
    </Slider>
  );

  return (
    <Themes theme={theme || 'B-HCA-Navy-Blue'} id={id}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>
            {subtitle}
            {title}
          </div>
          <div className={styles.carousel}>{slider}</div>
        </div>
      </div>
    </Themes>
  );
};

export default CarouselTestimonials;
