import React, { type JSX } from 'react';
import { CareersHompageHeroProps } from './CareersHompageHero.types';
import styles from './CareersHompageHero.module.scss';
import homepageHeroStyles from '../../site-components/HomepageHero/HomepageHero.module.scss';

const CareersHompageHero = (props: CareersHompageHeroProps): JSX.Element => {
  const { title, children, image } = props;
  return (
    <div className={homepageHeroStyles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        {children}
        <div className={homepageHeroStyles.image}>{image}</div>
      </div>
    </div>
  );
};

export default CareersHompageHero;
