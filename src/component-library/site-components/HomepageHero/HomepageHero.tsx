import React from 'react';
import { HomepageHeroProps } from './HomepageHero.types';
import styles from './HomepageHero.module.scss';
import Themes from '../../foundation/Themes/Themes';

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
