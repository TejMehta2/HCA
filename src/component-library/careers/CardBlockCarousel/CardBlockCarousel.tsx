import React from 'react';
import { CardBlockCarouselProps } from './CardBlockCarousel.types';
import styles from './CardBlockCarousel.module.scss';
import Themes from '../../foundation/Themes/Themes';
import CardBlockCarouselDesktop from './CardBlockCarouselDesktop';
import CardBlockCarouselMobile from './CardBlockCarouselMobile';

const CardBlockCarousel = (props: CardBlockCarouselProps): JSX.Element => {
  const { theme = 'J-HCA-Tangerine-20', id, subtitle, title, bodyText, tableOfContentTitle } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.intro} data-animate="s">
            <div className={styles.subtitle}>{subtitle}</div>
            {title}
            <div className={styles.body}>{bodyText}</div>
          </div>
          <CardBlockCarouselDesktop {...props} />
          <CardBlockCarouselMobile {...props} />
        </div>
      </div>
    </Themes>
  );
};

export default CardBlockCarousel;
