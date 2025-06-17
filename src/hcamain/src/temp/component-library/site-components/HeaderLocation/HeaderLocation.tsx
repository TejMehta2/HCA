import React from 'react';
import { HeaderLocationProps } from './HeaderLocation.types';
import styles from './HeaderLocation.module.scss';
import Themes from '../../foundation/Themes/Themes';

const HeaderLocation = (props: HeaderLocationProps): JSX.Element => {
  const {
    title,
    address,
    open,
    ctas,
    theme = 'L-HCA-Teal-5',
    image,
    cqc,
    doctify,
  } = props;
  return (
    <Themes theme={theme}>
      <div className={styles['hero-location']}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles['location-wrapper']}>
              <div className={styles.title}>{title}</div>
              {doctify && <div>{doctify}</div>}

              <div className={styles['location-info']}>
                <div className={styles.address}>
                  {address.icon}
                  <div className={styles['address-details']}>
                    {address.text} {address.link}
                  </div>
                </div>
                {open && (
                  <div className={styles.open}>
                    {open.icon}
                    {open.text}
                  </div>
                )}
              </div>
            </div>

            <div className={styles['cta-wrapper']}>
              {ctas && <div className={styles.ctas}>{ctas}</div>}
              {cqc && <div className={styles.cqc}>{cqc}</div>}
            </div>
          </div>
          <div className={styles.image}>{image}</div>
        </div>
      </div>
    </Themes>
  );
};

export default HeaderLocation;
