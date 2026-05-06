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
    subtitle,
    copy,
    stats,
    cta,
    image,
    cqc,
    doctify,
    children,
    id,
    tableOfContentTitle,
    imageKeepAspectRatio = false,
    theme = 'A-HCA-White',
  } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div
        className={[
          styles['intro-block'],
          styles[`image-${imageAlignment}`],
        ].join(' ')}
      >
        <div className={styles.grid}>
          <div className={styles['text-wrapper']} data-animate="l">
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            <div className={styles.title}>{title}</div>
            <div className={styles.copy}>{copy}</div>
            {stats && stats.length > 0 && (
              <ul className={styles.stats}>
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
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
                    <li className={styles.hr} aria-hidden="true">
                      <hr />
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            )}
            {children && (
              <div className={styles.children}>
                <Themes theme={theme}>{children}</Themes>
              </div>
            )}
            {cta && (
              <div className={styles.cta}>
                <Themes theme={theme}>
                  <Button size={'large'} variation={'full'}>
                    {cta}
                  </Button>
                </Themes>
              </div>
            )}
          </div>
          <div
            className={[
              styles['image-wrapper'],
              imageKeepAspectRatio ? styles['keep-aspect-ratio'] : '',
            ].join(' ')}
            data-animate="s"
          >
            <div className={styles.image}>{image}</div>
            <div className={styles.reviews}>
              <div className={styles.cqc}>{cqc}</div>
              {doctify && <div className={styles.mobile}>{doctify}</div>}
              <div className={styles.tablet}>
                <Themes
                  theme={
                    [
                      'Chelsea-Beige',
                      'Chelsea-Navy-Blue',
                      'Chelsea-White',
                    ].includes(theme)
                      ? theme
                      : 'B-HCA-Navy-Blue'
                  }
                >
                  {doctify && doctify}
                </Themes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default HomepageIntroBlock;
