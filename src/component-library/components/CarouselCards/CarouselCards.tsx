import React from 'react';
import { CarouselCardsProps } from './CarouselCards.types';
import styles from './CarouselCards.module.scss';
import Slider from '@ant-design/react-slick';
import './Slick.scss';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';

const CarouselCards = (props: CarouselCardsProps): JSX.Element => {
  const { title, link, children } = props;

  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
  };

  return (
    <div className={styles['test']}>
      <Text tag="h2" variation="display-3">
        {title}
      </Text>
      <Slider {...settings}>{children && children[0].props.children}</Slider>

      <Button size="large" theme="full-dark">
        {link}
      </Button>
    </div>
  );
};

export default CarouselCards;
