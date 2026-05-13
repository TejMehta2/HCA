import React from 'react';
import { HeaderProfileProps } from './HeaderProfile.types';
import styles from './HeaderProfile.module.scss';
import Themes from '../../foundation/Themes/Themes';

const HeaderProfile = (props: HeaderProfileProps): JSX.Element => {
  const { theme = 'B-HCA-Navy-Blue', image, title, department, ctas } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.content}>
            {image && <div className={styles.image}>{image}</div>}
            <div className={styles.text}>
              {title && <div>{title}</div>}
              {department && (
                <div className={styles.department}>{department}</div>
              )}
              {ctas && <div className={styles.ctas}>{ctas}</div>}
            </div>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default HeaderProfile;
