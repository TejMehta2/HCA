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

  const stars = [];

  /* Round down to nearest whole number and push that many filled stars */
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<Icons iconName="iconStar" />);
  }

  /* If there is a decimal, show a half star */
  if (!Number.isInteger(rating)) {
    stars.push(<Icons iconName="iconStarHalf" />);
  }

  /* Round up to nearest whole number and take away from 5 (max rating) to get empty stars */
  for (let i = 0; i < 5 - Math.ceil(rating); i++) {
    stars.push(<Icons iconName="iconStarEmpty" />);
  }

  return (
    <Themes theme="k">
      <div className={styles['wrapper']}>
        <div className={styles['container']}>
          <div>
            <Text tag="h2" variation="display-1">
              {rating.toString()}
            </Text>

            <div className={styles['stars']}>
              {stars.map((star, index) => (
                <span key={index}>{star}</span>
              ))}
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
            <Image
              src="/doctify.png"
              alt="doctify logo"
              width="83"
              height="21"
            />
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default CarouselReviews;
