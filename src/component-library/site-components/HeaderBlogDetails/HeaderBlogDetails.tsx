import React from 'react';
import { HeaderBlogDetailsProps } from './HeaderBlogDetails.types';
import styles from './HeaderBlogDetails.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { useColumnSplitterContext } from '../../context/columnSplitterContext';

const HeaderBlogDetails = (props: HeaderBlogDetailsProps): JSX.Element => {
  const { theme, tag, date, title, bodyCopy, authors, lastChecked } = props;
  const columnContext = useColumnSplitterContext();
  const hasMultipleColumns = columnContext?.hasMultipleColumns ?? false;

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={`${hasMultipleColumns ? '' : styles.container}`}>
          <div className={styles.info}>
            {tag}
            {date}
            {lastChecked && (
              <span className={styles.checked}>
                <span className={styles.separator}></span> Last checked &nbsp;
                {lastChecked}
              </span>
            )}
          </div>
          <div className={styles.title}>{title}</div>
          {bodyCopy && <div className={styles.copy}>{bodyCopy}</div>}
          {authors && <div className={styles.authors}>{authors}</div>}
        </div>
      </div>
    </Themes>
  );
};

export default HeaderBlogDetails;
