import React from 'react';
import { HeaderBlogDetailsProps } from './HeaderBlogDetails.types';
import styles from './HeaderBlogDetails.module.scss';
import Themes from '../../foundation/Themes/Themes';

const HeaderBlogDetails = (props: HeaderBlogDetailsProps): JSX.Element => {
  const { theme, tag, date, title } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.info}>
            {tag}
            {date}
          </div>
          {title}
        </div>
      </div>
    </Themes>
  );
};

export default HeaderBlogDetails;
