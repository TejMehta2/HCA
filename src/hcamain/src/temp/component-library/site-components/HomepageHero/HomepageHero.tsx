import React from 'react';
import { HomepageHeroProps } from './HomepageHero.types';
import styles from './HomepageHero.module.scss';
import Themes from '../../foundation/Themes/Themes';

export const getDynamicTitleStyle = (length?: number) => {
  if (!length) return 'display-1';
  if (length >= 60) {
    return 'display-6';
  } else if (length >= 50) {
    return 'display-5';
  } else if (length >= 40) {
    return 'display-4';
  } else if (length >= 35) {
    return 'display-3';
  } else if (length >= 25) {
    return 'display-2';
  } else return 'display-1';
};
const HomepageHero = (props: HomepageHeroProps): JSX.Element => {
  const { theme, title, search, ctaTitle, ctas, image } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>{title}</div>
          <div className={styles.search}>{search}</div>
          <div className={styles['cta-section']}>
            {ctaTitle}
            <Themes theme={theme}>
              <div className={styles.ctas}>{ctas}</div>
            </Themes>
          </div>
          <div className={styles.image}>{image}</div>
        </div>
      </div>
    </Themes>
  );
};

export default HomepageHero;
