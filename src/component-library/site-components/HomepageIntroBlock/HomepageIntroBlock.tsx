import React from 'react';
import { HomepageIntroBlockProps } from './HomepageIntroBlock.types';
import styles from './HomepageIntroBlock.module.scss';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';

const HomepageIntroBlock = (props: HomepageIntroBlockProps): JSX.Element => {
  const {
    imageAlignment = 'right',
    title,
    copy,
    stats,
    cta,
    image,
    cqc,
    doctify,
  } = props;
  return (
    <Themes theme="F-HCA-White">
      <div
        className={[
          styles['intro-block'],
          styles[`image-${imageAlignment}`],
        ].join(' ')}
      >
        <div className={styles.grid}>
          <div className={styles['text-wrapper']} data-animate="l">
            <div className={styles.title}>{title}</div>
            <div className={styles.copy}>{copy}</div>
            <ul className={styles.stats}>
              {stats.map((stat, index) => (
                <React.Fragment key={index}>
                  <li className={styles.hr} aria-hidden="true">
                    <hr />
                  </li>
                  <li>
                    <p className={styles.stat}>
                      <Text variation="display-2" tag="span">
                        {stat.value}
                      </Text>
                      <Text variation="body-medium-large" tag="span">
                        {stat.label}
                      </Text>
                    </p>
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <div className={styles.cta}>
              <Button size={'large'} variation={'full-dark'}>
                {cta}
              </Button>
            </div>
          </div>
          <div className={styles['image-wrapper']} data-animate="s">
            <div className={styles.image}>{image}</div>
            <div className={styles.reviews}>
              <div className={styles.cqc}>{cqc}</div>
              <div className={styles.mobile}>
                <Themes theme={'A-HCA-Main-Turquoise'}>{doctify}</Themes>
              </div>
              <div className={styles.tablet}>
                <Themes theme={'E-HCA-Dark-Grey'}>{doctify}</Themes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default HomepageIntroBlock;
