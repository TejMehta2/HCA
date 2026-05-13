import React from 'react';
import { CarouselReviewsProps } from './CarouselReviews.types';
import styles from './CarouselReviews.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';
import { NextArrow, PrevArrow } from '../CarouselCards/CustomArrows';
import Slider from '@ant-design/react-slick';
import DoctifyLogoDark from '../../assets/images/doctify-dark.png';
import DoctifyLogoLight from '../../assets/images/doctify-light.png';
import StarEmpty from '../../assets/shapes/StarEmpty.svg';
import StarHalf from '../../assets/shapes/StarHalf.svg';

const CarouselReviews = (props: CarouselReviewsProps): JSX.Element => {
  const {
    theme,
    rating,
    reviewCount,
    children,
    id,
    tableOfContentTitle,
    image,
  } = props;

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
    stars.push(<StarHalf />);
  }

  /* Round up to nearest whole number and take away from 5 (max rating) to get empty stars */
  for (let i = 0; i < 5 - Math.ceil(rating); i++) {
    stars.push(<StarEmpty />);
  }

  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles['wrapper']}>
        {image && <div className={styles.image}>{image}</div>}
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
            <Slider {...settings}>{children}</Slider>
          </div>

          <div className={styles['doctify']}>
            <Text tag="p" variation="body-bold-large">
              <span>Verified by</span>
            </Text>
            <Image
              src={image ? DoctifyLogoLight : DoctifyLogoDark}
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
