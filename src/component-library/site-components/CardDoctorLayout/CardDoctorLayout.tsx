import React from 'react';
import { CardDoctorLayoutProps } from './CardDoctorLayout.types';
import styles from './CardDoctorLayout.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';
const CardDoctorLayout = (props: CardDoctorLayoutProps): JSX.Element => {
  const { theme = 'D-HCA-Teal', title, children, cta, id, tableOfContentTitle } = props;
  return (
    <Themes theme={theme} tag="section" aria-label={title} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles['card-doctor-layout']}>
        <div className={styles.grid}>
          <div className={styles.title}>{title}</div>
          <div className={styles.children}>{children}</div>
          {cta && (
            <div className={styles.cta}>
              <Button size={'large'} variation={'full'}>
                {cta}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default CardDoctorLayout;
