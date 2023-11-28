import React from 'react';
import { CarouselReviewsProps } from './CarouselReviews.types';
import styles from './CarouselReviews.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';
import { NextArrow, PrevArrow } from '../CarouselCards/CustomArrows';
import Slider from '@ant-design/react-slick';

const CarouselReviews = (props: CarouselReviewsProps): JSX.Element => {
  const { rating, reviewCount, children } = props;

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
    <Themes theme="k">
      <div className={styles.wrapper}>
        <div>
          <Text tag="h2" variation="display-1">
            {rating}
          </Text>

          <div className={styles['stars']}>
            <Icons iconName="iconStar" />
            <Icons iconName="iconStar" />
            <Icons iconName="iconStar" />
            <Icons iconName="iconStar" />
            <Icons iconName="iconStar" />
          </div>

          <Text tag="p" variation="body-medium-extra-large">
            {reviewCount}
          </Text>
        </div>

        <div className={styles['carousel']}>
          <Slider {...settings}>
            {children && children[0].props.children}
          </Slider>
        </div>

        <div className={styles['doctify']}>
          <Text tag="p" variation="body-semi-bold-large">
            <span>Verified by</span>
          </Text>
          <Image src="/doctify.png" alt="doctify logo" width="83" height="21" />
        </div>
      </div>
    </Themes>
  );
};

export default CarouselReviews;
